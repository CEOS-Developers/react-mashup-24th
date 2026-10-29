import { mutationOptions, useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query';
import type { InfiniteData, QueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { setMatchFavorite } from '../apis/match';
import type {
  MatchFavoriteResponse,
  MatchListItemResponse,
  MatchListResponse,
} from '../types/match';
import { matchKeys } from './useMatches';

type MatchListData = InfiniteData<MatchListResponse>;
type FavoriteState = Pick<MatchFavoriteResponse, 'isFavorite' | 'favoriteCount'>;

const favoriteMutationKey = ['matches', 'favorite'] as const;

function updateFavoriteInList(
  data: MatchListData | undefined,
  matchId: number,
  update: (match: MatchListItemResponse) => FavoriteState,
): MatchListData | undefined {
  if (!data) return data;

  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      content: page.content.map((match) => {
        if (match.matchId !== matchId) return match;
        const favorite = update(match);
        return {
          ...match,
          isFavorite: favorite.isFavorite,
          favoriteCount: favorite.favoriteCount,
        };
      }),
    })),
  };
}

export function matchFavoriteMutationOptions(queryClient: QueryClient, matchId: number) {
  return mutationOptions({
    mutationKey: [...favoriteMutationKey, matchId],
    mutationFn: (isFavorite: boolean) => setMatchFavorite(matchId, isFavorite),
    retry: false,
    onMutate: async (isFavorite) => {
      await queryClient.cancelQueries({ queryKey: matchKeys.lists });

      const previousFavorites = queryClient
        .getQueriesData<MatchListData>({ queryKey: matchKeys.lists })
        .flatMap(([queryKey, data]) => {
          const match = data?.pages
            .flatMap((page) => page.content)
            .find((m) => m.matchId === matchId);
          return match
            ? [
                {
                  queryKey,
                  favorite: { isFavorite: match.isFavorite, favoriteCount: match.favoriteCount },
                },
              ]
            : [];
        });

      queryClient.setQueriesData<MatchListData>({ queryKey: matchKeys.lists }, (data) =>
        updateFavoriteInList(data, matchId, (match) => ({
          isFavorite,
          favoriteCount: Math.max(
            0,
            match.favoriteCount + Number(isFavorite) - Number(match.isFavorite),
          ),
        })),
      );

      return previousFavorites;
    },
    onSuccess: (favorite) => {
      queryClient.setQueriesData<MatchListData>({ queryKey: matchKeys.lists }, (data) =>
        updateFavoriteInList(data, matchId, () => favorite),
      );
    },
    onError: (_error, isFavorite, previousFavorites) => {
      // 실패한 매치의 찜 필드만 복원해 다른 매치의 동시 변경을 유지합니다.
      previousFavorites?.forEach(({ queryKey, favorite }) => {
        queryClient.setQueryData<MatchListData>(queryKey, (data) =>
          updateFavoriteInList(data, matchId, () => favorite),
        );
      });

      toast.error(
        isFavorite
          ? '찜을 등록하지 못했어요. 다시 시도해 주세요.'
          : '찜을 해제하지 못했어요. 다시 시도해 주세요.',
      );
    },
    onSettled: () => {
      // 다른 찜 변경이 진행 중이면 최종 요청이 끝날 때 목록을 다시 확인합니다.
      if (queryClient.isMutating({ mutationKey: favoriteMutationKey }) === 1) {
        return queryClient.invalidateQueries({ queryKey: matchKeys.lists });
      }
    },
  });
}

export function useMatchFavorite(matchId: number) {
  const queryClient = useQueryClient();
  const options = matchFavoriteMutationOptions(queryClient, matchId);
  const mutation = useMutation(options);
  const isPending = useIsMutating({ mutationKey: options.mutationKey }) > 0;

  const setFavorite = (isFavorite: boolean) => {
    if (queryClient.isMutating({ mutationKey: options.mutationKey }) === 0) {
      mutation.mutate(isFavorite);
    }
  };

  return { setFavorite, isPending };
}
