import { useCallback, useState } from 'react';
import { formatDateKey } from '../utils/date';
import Calendar from '../components/Calendar';
import MatchCard from '../components/match/MatchCard';
import { useMatches } from '../hooks/useMatches';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import type { MatchListItemResponse } from '../types/match';

function HomePage() {
  const [selectedDate, setSelectedDate] = useState(() => formatDateKey(new Date()));

  // 즐겨찾기 변경 API 연결 전까지 서버 값에 사용자의 선택만 임시로 덮어씁니다.
  const [favoriteOverrides, setFavoriteOverrides] = useState<Record<number, boolean>>({});

  const {
    data,
    isPending,
    isError,
    isFetching,
    isFetchingNextPage,
    isFetchNextPageError,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useMatches({ date: selectedDate });

  const matches = data?.pages.flatMap((page) => page.content) ?? [];
  const loadMore = useCallback(() => fetchNextPage({ cancelRefetch: false }), [fetchNextPage]);
  const loadMoreRef = useInfiniteScroll({
    enabled: hasNextPage && !isFetching && !isError,
    onLoadMore: loadMore,
  });

  const toggleFavorite = (match: MatchListItemResponse) => {
    setFavoriteOverrides((previous) => ({
      ...previous,
      [match.matchId]: !(previous[match.matchId] ?? match.isFavorite),
    }));
  };

  return (
    <div className="text-fg-neutral-default">
      <section className="flex h-13 items-center bg-bg-neutral-weak px-4">
        <h1 className="typo-body-medium-sb">1번 영역 · 52px</h1>
      </section>

      <section className="py-2.5" aria-label="2번 영역">
        <div className="flex h-8 items-center bg-bg-accent-blue-weak px-4">
          <h2 className="typo-body-medium-sb">2번 영역 · 32px · 위아래 10px</h2>
        </div>
      </section>

      <section className="pt-3 pb-4" aria-label="3번 영역">
        <div className="flex h-29 flex-col justify-center gap-1 bg-bg-accent-red-weak px-4">
          <h2 className="typo-body-medium-sb">3번 영역 · 116px</h2>
          <p className="typo-body-small-md text-fg-neutral-muted">위 12px · 아래 16px</p>
        </div>
      </section>
      <section className="sticky top-0 z-20 flex flex-col gap-5 bg-bg-neutral-default pb-5">
        <Calendar selectedKey={selectedDate} onSelect={setSelectedDate} />
      </section>

      <ul aria-label="소셜 매치 목록" aria-busy={isFetching}>
        {matches.map((match) => {
          const selected = favoriteOverrides[match.matchId] ?? match.isFavorite;

          return (
            <li key={match.matchId}>
              <MatchCard
                match={match}
                selected={selected}
                favoriteCount={match.favoriteCount + Number(selected) - Number(match.isFavorite)}
                onFavoriteClick={() => toggleFavorite(match)}
              />
            </li>
          );
        })}
      </ul>

      <div
        ref={loadMoreRef}
        className="flex min-h-16 flex-col items-center justify-center gap-3 px-4 py-5 text-center text-fg-neutral-muted typo-body-medium-md"
      >
        {isPending ? (
          <p role="status">매치를 불러오고 있어요.</p>
        ) : isError ? (
          <>
            <p role="alert">
              {isFetchNextPageError
                ? '다음 매치를 불러오지 못했어요.'
                : '매치 목록을 불러오지 못했어요.'}
            </p>
            <button
              type="button"
              disabled={isFetching}
              onClick={() => (isFetchNextPageError ? loadMore() : refetch())}
              className="h-10 cursor-pointer rounded-full bg-bg-brand-subtle px-4 text-fg-neutral-default typo-button-medium-md disabled:cursor-not-allowed disabled:opacity-50"
            >
              다시 시도
            </button>
          </>
        ) : matches.length === 0 ? (
          <p role="status">선택한 날짜에 매치가 없어요.</p>
        ) : isFetchingNextPage ? (
          <p role="status">다음 매치를 불러오고 있어요.</p>
        ) : hasNextPage ? (
          <button
            type="button"
            disabled={isFetching}
            onClick={loadMore}
            className="h-10 cursor-pointer rounded-full bg-bg-neutral-weak px-4 typo-button-medium-md disabled:cursor-not-allowed disabled:opacity-50"
          >
            매치 더 보기
          </button>
        ) : (
          <p role="status">모든 매치를 확인했어요.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
