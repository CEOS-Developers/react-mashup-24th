import type { MatchFilters } from '../types/match';

export function normalizeMatchFilters(filters: MatchFilters): MatchFilters {
  return Object.fromEntries(
    Object.entries(filters).filter(([key, value]) => {
      if (key === 'date' || key === 'page' || key === 'size') return false;
      if (value == null || (Array.isArray(value) && value.length === 0)) return false;
      if (key === 'indoor' || key === 'awning' || key === 'parking') return value === true;
      return true;
    }),
  );
}
