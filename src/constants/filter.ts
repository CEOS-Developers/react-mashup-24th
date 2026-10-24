import type { FilterState } from '../types/filter';

export const EMPTY_FILTER: FilterState = { status: [], time: null, gender: [] };

export const STATUS_OPTIONS = [
  { value: 'closing', label: '마감임박' },
  { value: 'confirmed', label: '확정임박' },
];

export const TIME_OPTIONS = [
  { value: '18', label: '18시 이후' },
  { value: '20', label: '20시 이후' },
  { value: '22', label: '22시 이후' },
  { value: '23', label: '23시 이후' },
];

export const GENDER_OPTIONS = [
  { value: 'male', label: '남자' },
  { value: 'female', label: '여자' },
];