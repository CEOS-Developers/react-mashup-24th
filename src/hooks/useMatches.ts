import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { getMatches } from '../apis/match';
import type { MatchListQuery } from '../types/match';

export const matchKeys = {
  lists: ['matches', 'list'] as const,
  // 추후 POST 필터 조회는 별도 키를 사용해 GET 목록의 캐시와 구분합니다.
  list: (params: MatchListQuery) => [...matchKeys.lists, 'GET', params] as const,
};

export function matchListQueryOptions({ size = 20, hideClosed = true, ...query }: MatchListQuery) {
  const params = { ...query, size, hideClosed };

  return infiniteQueryOptions({
    queryKey: matchKeys.list(params),
    queryFn: ({ pageParam, signal }) => getMatches({ ...params, page: pageParam }, signal),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext && lastPage.page < 10000 ? lastPage.page + 1 : undefined,
    staleTime: 30 * 1000,
    retry: (failureCount, error) => {
      if (isAxiosError(error) && error.response && error.response.status < 500) return false;
      return failureCount < 2;
    },
  });
}

export function useMatches(query: MatchListQuery) {
  return useInfiniteQuery(matchListQueryOptions(query));
}
