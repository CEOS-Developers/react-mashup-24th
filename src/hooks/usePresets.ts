import { useState } from 'react';
import type { FilterPreset, FilterState } from '../types/filter';

const STORAGE_KEY = 'plab-filter-presets';

function readPresets(): FilterPreset[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as FilterPreset[];
  } catch {
    return [];
  }
}

export function usePresets() {
  const [presets, setPresets] = useState<FilterPreset[]>(readPresets);

  const savePresets = (next: FilterPreset[]) => {
    setPresets(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // 저장 공간을 쓸 수 없는 환경(시크릿 모드 등)이면 화면에만 반영돼요.
    }
  };

  const addPreset = (name: string, filter: FilterState) =>
    savePresets([...presets, { id: crypto.randomUUID(), name, filter }]);

  const removePreset = (id: string) => savePresets(presets.filter((preset) => preset.id !== id));

  return { presets, addPreset, removePreset };
}
