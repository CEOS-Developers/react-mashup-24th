import { useCallback, useState } from 'react';
import { formatDateKey } from '../utils/date';
import Calendar from '../components/Calendar';
import MatchCard from '../components/match/MatchCard';
import { useMatches } from '../hooks/useMatches';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

function HomePage() {
  const [selectedDate, setSelectedDate] = useState(() => formatDateKey(new Date()));

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
        {matches.map((match) => (
          <li key={match.matchId}>
            <MatchCard match={match} />
          </li>
        ))}
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
        ) : null}
      </div>
    </div>
  );
}

export default HomePage;
