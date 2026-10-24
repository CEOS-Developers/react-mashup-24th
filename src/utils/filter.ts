import { GENDER_OPTIONS, STATUS_OPTIONS, TIME_OPTIONS } from '../constants/filter';
import type { FilterState } from '../types/filter';

export function countFilter(filter: FilterState) {
  return filter.status.length + (filter.time ? 1 : 0) + filter.gender.length;
}

export function toggleValue(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function isSameFilter(a: FilterState, b: FilterState) {
  const normalize = (filter: FilterState) =>
    JSON.stringify({
      status: [...filter.status].sort(),
      time: filter.time,
      gender: [...filter.gender].sort(),
    });
  return normalize(a) === normalize(b);
}

export function summarizeFilter(filter: FilterState) {
  const labels = [
    ...STATUS_OPTIONS.filter((option) => filter.status.includes(option.value)),
    ...TIME_OPTIONS.filter((option) => option.value === filter.time),
    ...GENDER_OPTIONS.filter((option) => filter.gender.includes(option.value)),
  ].map((option) => option.label);

  if (labels.length === 0) return '조건 없음';
  if (labels.length === 1) return labels[0];
  return `${labels[0]} 외 ${labels.length - 1}개`;
}