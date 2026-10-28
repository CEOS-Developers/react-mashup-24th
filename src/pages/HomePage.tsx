import { useState } from 'react';
import { EMPTY_FILTER } from '../constants/filter';
import type { FilterState } from '../types/filter';
import { formatDateKey } from '../utils/date';
import { countFilter } from '../utils/filter';
import Calendar from '../components/Calendar';
import FilterBar from '../components/FilterBar';
import FilterBottomSheet from '../components/FilterBottomSheet';
import Banner from '../components/Banner';
import CategoryChips from '../components/CategoryChips';
import MainTabs from '../components/MainTabs';

function HomePage() {
  const [selectedDate, setSelectedDate] = useState(() => formatDateKey(new Date()));
  const [appliedFilter, setAppliedFilter] = useState<FilterState>(EMPTY_FILTER);
  const [appliedPresetName, setAppliedPresetName] = useState<string | null>(null);
  const [hideClosed, setHideClosed] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="text-fg-neutral-default">
      <MainTabs selected="소셜 매치" />
      <CategoryChips />
      <Banner />

      <section className="sticky top-0 z-20 flex flex-col gap-5 bg-bg-neutral-default pb-5">
        <Calendar selectedKey={selectedDate} onSelect={setSelectedDate} />
        <FilterBar
          filterCount={countFilter(appliedFilter)}
          presetName={appliedPresetName}
          hideClosed={hideClosed}
          onRegionClick={() => {}}
          onFilterClick={() => setIsFilterOpen(true)}
          onHideClosedToggle={() => setHideClosed((prev) => !prev)}
        />
      </section>

      <ul className="space-y-3 px-4" aria-label="매치 리스트 자리표시자">
        {Array.from({ length: 12 }, (_, index) => (
          <li
            key={index}
            className="flex h-24 flex-col justify-center gap-1 rounded-medium border border-border-default bg-bg-neutral-weak px-4"
          >
            <h3 className="typo-body-medium-sb">매치 리스트 {index + 1}</h3>
            <p className="typo-body-small-md text-fg-neutral-muted">스크롤 확인용 자리표시자</p>
          </li>
        ))}
      </ul>

      <FilterBottomSheet
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        appliedFilter={appliedFilter}
        onApply={(filter, presetName) => {
          setAppliedFilter(filter);
          setAppliedPresetName(presetName);
        }}
      />
    </div>
  );
}

export default HomePage;
