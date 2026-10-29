import { queryOptions, skipToken, useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { getCities, getCityAreas } from '../apis/region';

export const cityKeys = {
  list: ['cities'] as const,
  areas: (cityId: number | null) => ['cities', cityId, 'areas'] as const,
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
  return useQuery({ ...citiesQueryOptions(), enabled });
}

export function useCityAreas(cityId: number | null, enabled = true) {
  return useQuery({ ...cityAreasQueryOptions(cityId), enabled: enabled && cityId !== null });
}
