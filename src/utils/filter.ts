import { FILTER_SECTIONS } from '../constants/filter';
import type { BooleanKey, FilterOption, FilterSectionConfig, FilterState } from '../types/filter';

type OptionValue = FilterOption['value'];

export function toggleValue<T>(list: T[], value: T) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function isChipOn(filter: FilterState, section: FilterSectionConfig, value: OptionValue) {
  if (section.type === 'multi') return (filter[section.key] as OptionValue[]).includes(value);
  if (section.type === 'single') return filter[section.key] === value;
  return filter[value as BooleanKey];
}

export function toggleChip(
  filter: FilterState,
  section: FilterSectionConfig,
  value: OptionValue,
): FilterState {
  if (section.type === 'multi') {
    return { ...filter, [section.key]: toggleValue(filter[section.key] as OptionValue[], value) };
  }
  if (section.type === 'single') {
    return { ...filter, [section.key]: filter[section.key] === value ? null : value };
  }
  const key = value as BooleanKey;
  return { ...filter, [key]: !filter[key] };
}

export function countFilter(filter: FilterState) {
  return FILTER_SECTIONS.reduce(
    (count, section) =>
      count + section.options.filter((option) => isChipOn(filter, section, option.value)).length,
    0,
  );
}

export function isSameFilter(a: FilterState, b: FilterState) {
  return FILTER_SECTIONS.every((section) =>
    section.options.every(
      (option) => isChipOn(a, section, option.value) === isChipOn(b, section, option.value),
    ),
  );
}

export function summarizeFilter(filter: FilterState) {
  const labels = FILTER_SECTIONS.flatMap((section) =>
    section.options
      .filter((option) => isChipOn(filter, section, option.value))
      .map((option) => option.label),
  );

  if (labels.length === 0) return '조건 없음';
  if (labels.length === 1) return labels[0];
  return `${labels[0]} 외 ${labels.length - 1}개`;
}
