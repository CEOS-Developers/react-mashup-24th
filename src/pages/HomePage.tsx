import { useCallback, useState } from 'react';
import { isAxiosError } from 'axios';
import { EMPTY_FILTER } from '../constants/filter';
import type { FilterState } from '../types/filter';
import { formatDateKey } from '../utils/date';
import { countFilter, isSameFilter, toMatchFilters } from '../utils/filter';
import Calendar from '../components/Calendar';
import MatchCard from '../components/match/MatchCard';
import { useMatches } from '../hooks/useMatches';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import type { BaseResponse } from '../types/response';
import FilterBar from '../components/FilterBar';
import FilterBottomSheet from '../components/FilterBottomSheet';
import Banner from '../components/Banner';
import CategoryChips from '../components/CategoryChips';
import MainTabs from '../components/MainTabs';
import { useMatchPresets } from '../hooks/useMatchPresets';
import RegionBottomSheet from '../components/RegionBottomSheet';
import type { RegionSelection } from '../types/region';

function HomePage() {
  const [selectedDate, setSelectedDate] = useState(() => formatDateKey(new Date()));
  const [appliedFilter, setAppliedFilter] = useState<FilterState>(EMPTY_FILTER);
  const { presets, addPreset, removePreset, isPresetPending, presetError } = useMatchPresets();
  const appliedPresetName =
    presets.find((preset) => isSameFilter(preset.filter, appliedFilter))?.name ?? null;
  const [hideClosed, setHideClosed] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [appliedRegion, setAppliedRegion] = useState<RegionSelection>({
    cityId: null,
    areaIds: [],
  });

  const {
    data,
    error,
    isPending,
    isError,
    isFetching,
    isFetchingNextPage,
    isFetchNextPageError,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useMatches({
    ...toMatchFilters(appliedFilter),
    areaId: appliedRegion.areaIds,
    date: selectedDate,
    hideClosed,
  });

  const isFilterRequiredError =
    isAxiosError<BaseResponse<unknown>>(error) && error.response?.data?.code === 'MATCH4001';
  const matches = data?.pages.flatMap((page) => page.content) ?? [];
  const loadMore = useCallback(() => fetchNextPage({ cancelRefetch: false }), [fetchNextPage]);
  const loadMoreRef = useInfiniteScroll({
    enabled: hasNextPage && !isFetching && !isError,
    onLoadMore: loadMore,
  });

  return (
    <div className="text-fg-neutral-default">
      <MainTabs selected="소셜 매치" />
      <CategoryChips />
      <Banner />

      <section className="sticky top-0 z-20 flex flex-col gap-5 bg-bg-neutral-default pb-5">
        <Calendar selectedKey={selectedDate} onSelect={setSelectedDate} />
        <FilterBar
          hasAppliedRegion={appliedRegion.areaIds.length > 0}
          filterCount={countFilter(appliedFilter)}
          presetName={appliedPresetName}
          hideClosed={hideClosed}
          onRegionClick={() => setIsRegionOpen(true)}
          onFilterClick={() => setIsFilterOpen(true)}
          onHideClosedToggle={() => setHideClosed((prev) => !prev)}
          onMapClick={() => setIsRegionOpen(true)}
        />
      </section>

      <ul aria-label="소셜 매치 목록" aria-busy={isFetching}>
        {matches.map((match) => (
          <li key={match.matchId}>
            <MatchCard match={match} />
          </li>
        ))}
      </ul>

      <RegionBottomSheet
        open={isRegionOpen}
        onClose={() => setIsRegionOpen(false)}
        onApply={setAppliedRegion}
      />

      <div
        ref={loadMoreRef}
        className="flex min-h-16 flex-col items-center justify-center gap-3 px-4 py-5 text-center text-fg-neutral-muted typo-body-medium-md"
      >
        {isPending ? (
          <p role="status">매치를 불러오고 있어요.</p>
        ) : isError ? (
          <>
            <p role="alert">
              {isFilterRequiredError
                ? '필터를 하나 이상 선택해 주세요.'
                : isFetchNextPageError
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

      <FilterBottomSheet
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        appliedFilter={appliedFilter}
        presets={presets}
        onAddPreset={addPreset}
        onRemovePreset={removePreset}
        isPresetPending={isPresetPending}
        presetError={presetError}
        onApply={setAppliedFilter}
      />
    </div>
  );
}

export default HomePage;
