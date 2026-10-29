import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { getMatches, searchMatches } from '../apis/match';
import type { MatchListQuery } from '../types/match';
import { normalizeMatchFilters } from '../utils/match';

export const matchKeys = {
  lists: ['matches', 'list'] as const,
  list: (params: MatchListQuery) => [...matchKeys.lists, 'GET', params] as const,
  search: (params: MatchListQuery) => [...matchKeys.lists, 'POST', params] as const,
};

export function matchListQueryOptions({
  date,
  size = 20,
  hideClosed = true,
  ...filters
}: MatchListQuery) {
  const appliedFilters = normalizeMatchFilters(filters);
  // hideClosed와 페이지 정보는 추가 필터 개수에서 제외합니다.
  const hasFilters = Object.keys(appliedFilters).length > 0;
  const params = { date, ...appliedFilters, size, hideClosed };

  return infiniteQueryOptions({
    queryKey: hasFilters ? matchKeys.search(params) : matchKeys.list(params),
    queryFn: ({ pageParam, signal }) =>
      hasFilters
        ? searchMatches({ ...params, page: pageParam }, signal)
        : getMatches({ ...params, page: pageParam }, signal),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext && lastPage.page < 10000 ? lastPage.page + 1 : undefined,
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
    retry: (failureCount, error) => {
      if (isAxiosError(error) && error.response && error.response.status < 500) return false;
      return failureCount < 2;
    },
  });
}

export function useMatches(query: MatchListQuery) {
  return useInfiniteQuery(matchListQueryOptions(query));
}
