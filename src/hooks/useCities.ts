import { queryOptions, skipToken, useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { getCities, getCityAreas, getFavoriteAreas } from '../apis/region';

export const cityKeys = {
  list: ['cities'] as const,
  areas: (cityId: number | null) => ['cities', cityId, 'areas'] as const,
};

export const areaKeys = {
  favorites: ['areas', 'favorites'] as const,
};

function retryRegionRequest(failureCount: number, error: Error) {
  if (isAxiosError(error) && error.response && error.response.status < 500) return false;
  return failureCount < 2;
}

export function citiesQueryOptions() {
  return queryOptions({
    queryKey: cityKeys.list,
    queryFn: ({ signal }) => getCities(signal),
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: retryRegionRequest,
  });
}

export function cityAreasQueryOptions(cityId: number | null) {
  return queryOptions({
    queryKey: cityKeys.areas(cityId),
    queryFn: cityId === null ? skipToken : ({ signal }) => getCityAreas(cityId, signal),
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: retryRegionRequest,
  });
}

export function useCities(enabled = true) {
  const query = useQuery({ ...citiesQueryOptions(), enabled });
  return { ...query, data: query.data ?? [] };
}

export function useCityAreas(cityId: number | null, enabled = true) {
  const query = useQuery({ ...cityAreasQueryOptions(cityId), enabled: enabled && cityId !== null });
  return { ...query, data: query.data ?? [] };
}

export function useFavoriteAreas(enabled = true) {
  const query = useQuery({
    queryKey: areaKeys.favorites,
    queryFn: ({ signal }) => getFavoriteAreas(signal),
    enabled,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: retryRegionRequest,
  });
  return { ...query, data: query.data ?? [] };
}
