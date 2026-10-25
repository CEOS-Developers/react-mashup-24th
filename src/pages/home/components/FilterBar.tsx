import ChipButton from '../../../components/common/ChipButton';
import iconLocation from '../../../assets/icons/icon-location.svg';
import MapIcon from '../../../assets/icons/icon-map.svg?react';

type FilterBarProps = {
  filterCount: number;
  hideClosed: boolean;
  onRegionClick: () => void;
  onFilterClick: () => void;
  onHideClosedToggle: () => void;
  onMapClick?: () => void;
};

function FilterBar({
  filterCount,
  hideClosed,
  onRegionClick,
  onFilterClick,
  onHideClosedToggle,
  onMapClick,
}: FilterBarProps) {
  return (
    <div className="flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <ChipButton icon={iconLocation} selected onClick={onRegionClick}>
          내 지역
        </ChipButton>
        <ChipButton withIcon selected={filterCount > 0} onClick={onFilterClick}>
          {filterCount > 0 ? `필터 ${filterCount}` : '필터'}
        </ChipButton>
        <ChipButton selected={hideClosed} onClick={onHideClosedToggle}>
          마감 가리기
        </ChipButton>
      </div>
      <div className="flex items-center gap-2">
        <span aria-hidden="true" className="h-8 w-px bg-border-weak" />
        <button
          type="button"
          aria-label="지도로 보기"
          onClick={onMapClick}
          className="flex h-8 w-[34px] cursor-pointer items-center justify-center rounded-small border border-border-default text-fg-neutral-muted"
        >
          <MapIcon className="shrink-0" />
        </button>
      </div>
    </div>
  );
}

export default FilterBar;