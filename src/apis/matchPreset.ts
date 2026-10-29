import axiosInstance from './axios';
import { EMPTY_FILTER } from '../constants/filter';
import type { FilterState } from '../types/filter';
import type { BaseResponse } from '../types/response';

const PRESET_URL = '/api/users/me/match-presets';

export type MatchPresetResponse = {
  presetId: number;
  title: string;
  filters: Partial<FilterState>;
  createdAt: string;
  updatedAt: string;
};

export async function getMatchPresets() {
  const { data } = await axiosInstance.get<BaseResponse<MatchPresetResponse[]>>(PRESET_URL);

  if (!data.isSuccess || !data.result) {
    throw new Error(data.message || '프리셋을 불러오지 못했어요.');
  }

  return data.result;
}

export async function createMatchPreset(title: string, filters: FilterState) {
  const { data } = await axiosInstance.post<BaseResponse<MatchPresetResponse>>(PRESET_URL, {
    title,
    filters,
  });

  if (!data.isSuccess || !data.result) {
    throw new Error(data.message || '프리셋을 저장하지 못했어요.');
  }

  return data.result;
}

export async function deleteMatchPreset(presetId: number) {
  await axiosInstance.delete(`${PRESET_URL}/${presetId}`);
}

export function toFilterState(filters: Partial<FilterState>): FilterState {
  return {
    ...EMPTY_FILTER,
    ...Object.fromEntries(Object.entries(filters).filter(([, value]) => value !== null)),
  };
}
