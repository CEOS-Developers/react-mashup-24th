import { useState } from 'react';
import { isAxiosError } from 'axios';
import ActionButton from './ActionButton';
import BottomSheet from './common/BottomSheet';
import FavoriteButton from './common/FavoriteButton';
import { useCities, useCityAreas, useFavoriteAreas } from '../hooks/useCities';
import { useMutationFavoriteArea } from '../hooks/useMutationFavoriteArea';
import type { RegionSelection } from '../types/region';
import type { BaseResponse } from '../types/response';
import LocationIcon from '../assets/icons/icon-location.svg?react';
import StadiumIcon from '../assets/icons/icon-stadium.svg?react';

type RegionBottomSheetProps = {
  open: boolean;
  onClose: () => void;
  onApply: (selection: RegionSelection) => void;
};

function cityLabel(name: string) {
  return name.replace(/(특별자치시|특별자치도|특별시|광역시|도)$/, '');
}

function RegionBottomSheet({ open, onClose, onApply }: RegionBottomSheetProps) {
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);

  const { data: cities, ...citiesQuery } = useCities(open);
  const { data: cityAreas, ...areasQuery } = useCityAreas(selectedCityId, open);
  const { data: favoriteAreas, ...favoriteAreasQuery } = useFavoriteAreas(open);

  const { mutate, isPending, error: favoriteError } = useMutationFavoriteArea();
  const isFavoriteView = selectedCityId === null;
  const areas = isFavoriteView ? favoriteAreas : cityAreas;

  const isLoading = isFavoriteView
    ? favoriteAreasQuery.isPending
    : citiesQuery.isPending || (cities.length > 0 && areasQuery.isPending);

  const error = isFavoriteView ? favoriteAreasQuery.error : (citiesQuery.error ?? areasQuery.error);
  const cityNotFound = isAxiosError(error) && error.response?.status === 404;
  const favoriteErrorMessage = isAxiosError<BaseResponse<never>>(favoriteError)
    ? (favoriteError.response?.data?.message ??
      '관심 지역을 변경하지 못했어요. 다시 시도해 주세요.')
    : favoriteError?.message;

  const handleClose = () => {
    setSelectedCityId(null);
    onClose();
  };

  const retry = () => {
    if (isFavoriteView) return favoriteAreasQuery.refetch();
    if (citiesQuery.isError) return citiesQuery.refetch();
    return areasQuery.refetch();
  };

  const canApply = favoriteAreasQuery.isSuccess && !isPending;
  const apply = () => {
    if (!canApply) return;
    onApply({
      cityId: null,
      areaIds: favoriteAreas.map((area) => area.areaId),
    });
    handleClose();
  };

  return (
    <BottomSheet open={open} onClose={handleClose} title="지역 선택">
      <div className="flex h-full min-h-0 flex-col">
        <div className="flex h-9 shrink-0 gap-[7px]">
          <button
            type="button"
            aria-pressed="true"
            className="flex flex-1 items-center justify-center rounded-small bg-bg-neutral-subtle pr-1 text-fg-neutral-default typo-button-medium-md"
          >
            <span className="flex size-6 items-center justify-center">
              <LocationIcon aria-hidden="true" className="h-[13.2px] w-[14.4px]" />
            </span>
            <span className="ml-1">내 지역</span>
          </button>
          <button
            type="button"
            disabled
            className="flex flex-1 cursor-not-allowed items-center justify-center rounded-small pr-1 text-fg-neutral-muted typo-button-medium-md"
          >
            <span className="flex size-6 items-center justify-center">
              <StadiumIcon aria-hidden="true" className="h-[12.28px] w-[15.6px]" />
            </span>
            <span className="ml-1">내 구장</span>
          </button>
        </div>

        <div className="mt-4 mb-2 grid min-h-0 flex-1 grid-cols-[80px_minmax(0,1fr)] gap-[23px]">
          <nav
            aria-label="도시 선택"
            className="flex min-h-0 flex-col gap-2 overflow-y-auto overscroll-contain [scrollbar-width:none]"
          >
            <button
              type="button"
              aria-pressed={isFavoriteView}
              onClick={() => setSelectedCityId(null)}
              className={`flex h-9 w-20 shrink-0 cursor-pointer items-center justify-center rounded-small typo-button-medium-md ${isFavoriteView ? 'bg-bg-neutral-subtle text-fg-neutral-default' : 'text-fg-neutral-subtle'}`}
            >
              내 지역
            </button>
            {cities.map((city) => (
              <button
                key={city.cityId}
                type="button"
                aria-label={city.name}
                aria-pressed={selectedCityId === city.cityId}
                onClick={() => setSelectedCityId(city.cityId)}
                className={`flex h-9 w-20 shrink-0 cursor-pointer items-center justify-center rounded-small typo-button-medium-md ${selectedCityId === city.cityId ? 'bg-bg-neutral-subtle text-fg-neutral-default' : 'text-fg-neutral-subtle'}`}
              >
                {cityLabel(city.name)}
              </button>
            ))}
          </nav>

          <div className="min-h-0 overflow-y-auto overscroll-contain [scrollbar-width:none]">
            {error ? (
              <div className="flex flex-col items-start gap-3 py-2 text-fg-neutral-muted typo-body-medium-md">
                <p role="alert">
                  {cityNotFound
                    ? '도시를 찾을 수 없어요. 다른 도시를 선택해 주세요.'
                    : '지역 목록을 불러오지 못했어요.'}
                </p>
                <button type="button" onClick={retry} className="cursor-pointer underline">
                  다시 시도
                </button>
              </div>
            ) : isLoading ? (
              <p role="status" className="py-2 text-fg-neutral-muted typo-body-medium-md">
                {!isFavoriteView && citiesQuery.isPending
                  ? '도시를 불러오고 있어요.'
                  : '지역을 불러오고 있어요.'}
              </p>
            ) : areas.length === 0 ? (
              <p role="status" className="py-2 text-fg-neutral-muted typo-body-medium-md">
                {isFavoriteView
                  ? '내 지역이 없어요.'
                  : cities.length === 0
                    ? '선택할 수 있는 도시가 없어요.'
                    : '등록된 지역이 없어요.'}
              </p>
            ) : (
              <ul
                aria-label={isFavoriteView ? '내 지역 목록' : '지역 목록'}
                className="flex flex-col gap-1"
              >
                {areas.map((area) => (
                  <li key={area.areaId} className="shrink-0">
                    <div className="flex h-9 items-center gap-2 text-fg-neutral-muted typo-body-medium-md">
                      <span className="min-w-0 flex-1 truncate">
                        {isFavoriteView ? `${cityLabel(area.cityName)} ${area.name}` : area.name}
                      </span>
                      <FavoriteButton
                        selected={area.isFavorite}
                        disabled={isPending}
                        onClick={() => mutate({ area, isFavorite: !area.isFavorite })}
                        aria-label={`${area.name} 관심 지역 ${area.isFavorite ? '해제' : '등록'}`}
                        className="h-9 text-fg-neutral-weak!"
                      />
                    </div>
                    <div aria-hidden="true" className="mt-1 h-px w-full bg-border-weak" />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {favoriteErrorMessage && (
          <p role="alert" className="mb-2 shrink-0 text-fg-accent-info-red typo-body-small-md">
            {favoriteErrorMessage}
          </p>
        )}
        <div className="flex shrink-0">
          <ActionButton className="h-11!" onClick={apply} disabled={!canApply}>
            적용
          </ActionButton>
        </div>
      </div>
    </BottomSheet>
  );
}

export default RegionBottomSheet;
