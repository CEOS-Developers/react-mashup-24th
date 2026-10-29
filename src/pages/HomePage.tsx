import { useState } from 'react';
import { EMPTY_FILTER } from '../constants/filter';
import type { FilterState } from '../types/filter';
import { formatDateKey } from '../utils/date';
import { countFilter } from '../utils/filter';
import Calendar from '../components/Calendar';
import MatchCard from '../components/match/MatchCard';
import { mockMatches } from '../mocks/matches';
import FilterBar from '../components/FilterBar';
import FilterBottomSheet from '../components/FilterBottomSheet';
import Banner from '../components/Banner';
import CategoryChips from '../components/CategoryChips';
import MainTabs from '../components/MainTabs';
import RegionBottomSheet from '../components/RegionBottomSheet';
import type { RegionSelection } from '../types/region';

function HomePage() {
  const [selectedDate, setSelectedDate] = useState(() => formatDateKey(new Date()));
  const [appliedFilter, setAppliedFilter] = useState<FilterState>(EMPTY_FILTER);
  const [appliedPresetName, setAppliedPresetName] = useState<string | null>(null);
  const [hideClosed, setHideClosed] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [, setAppliedRegion] = useState<RegionSelection>({
    cityId: null,
    areaIds: [],
  });
  const [favoriteIds, setFavoriteIds] = useState(
    () => new Set(mockMatches.filter((match) => match.isFavorite).map((match) => match.id)),
  );

  const toggleFavorite = (id: string) => {
    setFavoriteIds((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

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
          onRegionClick={() => setIsRegionOpen(true)}
          onFilterClick={() => setIsFilterOpen(true)}
          onHideClosedToggle={() => setHideClosed((prev) => !prev)}
          onMapClick={() => setIsRegionOpen(true)}
        />
      </section>

      <ul aria-label="소셜 매치 목록">
        {mockMatches.map((match) => (
          <li key={match.id}>
            <MatchCard
              match={match}
              selected={favoriteIds.has(match.id)}
              favoriteCount={
                match.favoriteCount + Number(favoriteIds.has(match.id)) - Number(match.isFavorite)
              }
              onFavoriteClick={() => toggleFavorite(match.id)}
            />
          </li>
        ))}
      </ul>

      <RegionBottomSheet
        open={isRegionOpen}
        onClose={() => setIsRegionOpen(false)}
        onApply={setAppliedRegion}
      />

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
