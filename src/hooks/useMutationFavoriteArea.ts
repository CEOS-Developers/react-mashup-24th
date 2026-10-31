import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateFavoriteArea } from '../apis/region';
import type { AreaResponse } from '../types/region';
import { areaKeys, cityKeys } from './useCities';

type FavoriteAreaVariables = {
  area: AreaResponse;
  isFavorite: boolean;
};

function updateFavoriteList(areas: AreaResponse[], area: AreaResponse, isFavorite: boolean) {
  const remaining = areas.filter((item) => item.areaId !== area.areaId);
  if (!isFavorite) return remaining;

  return [...remaining, { ...area, isFavorite }].sort(
    (a, b) => a.cityId - b.cityId || a.name.localeCompare(b.name, 'ko') || a.areaId - b.areaId,
  );
}

export function useMutationFavoriteArea() {
  const queryClient = useQueryClient();
  const cityAreasFilter = {
    queryKey: cityKeys.list,
    predicate: (query: { queryKey: readonly unknown[] }) => query.queryKey[2] === 'areas',
  };

  const updateCaches = (area: AreaResponse, isFavorite: boolean) => {
    queryClient.setQueriesData<AreaResponse[]>(cityAreasFilter, (areas) =>
      areas?.map((item) => (item.areaId === area.areaId ? { ...item, isFavorite } : item)),
    );
    queryClient.setQueryData<AreaResponse[]>(areaKeys.favorites, (areas) =>
      areas === undefined ? undefined : updateFavoriteList(areas, area, isFavorite),
    );
  };

  return useMutation({
    mutationFn: ({ area, isFavorite }: FavoriteAreaVariables) =>
      updateFavoriteArea(area.areaId, isFavorite),
    retry: false,
    onMutate: async ({ area, isFavorite }) => {
      await Promise.all([
        queryClient.cancelQueries(cityAreasFilter),
        queryClient.cancelQueries({ queryKey: areaKeys.favorites }),
      ]);

      const previousCities = queryClient.getQueriesData<AreaResponse[]>(cityAreasFilter);
      const previousFavorites = queryClient.getQueryData<AreaResponse[]>(areaKeys.favorites);
      updateCaches(area, isFavorite);

      return { previousCities, previousFavorites };
    },
    onError: (_error, { area }, context) => {
      if (!context) return;

      // 실패한 지역만 복구해 다른 지역의 변경을 덮어쓰지 않습니다.
      for (const [queryKey, previous] of context.previousCities) {
        const original = previous?.find((item) => item.areaId === area.areaId);
        if (!original) continue;
        queryClient.setQueryData<AreaResponse[]>(queryKey, (current) =>
          current?.map((item) => (item.areaId === area.areaId ? original : item)),
        );
      }
      if (context.previousFavorites !== undefined) {
        const original = context.previousFavorites.find((item) => item.areaId === area.areaId);
        queryClient.setQueryData<AreaResponse[]>(areaKeys.favorites, (current) =>
          current === undefined
            ? undefined
            : updateFavoriteList(current, original ?? area, Boolean(original)),
        );
      }
    },
    onSuccess: ({ isFavorite }, { area }) => updateCaches(area, isFavorite),
    onSettled: () =>
      Promise.all([
        queryClient.invalidateQueries(cityAreasFilter),
        queryClient.invalidateQueries({ queryKey: areaKeys.favorites }),
      ]),
  });
}
