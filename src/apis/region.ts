import type { AreaResponse, CityResponse } from '../types/region';
import type { BaseResponse } from '../types/response';
import axiosInstance from './axios';

export async function getCities(signal?: AbortSignal): Promise<CityResponse[]> {
  const { data } = await axiosInstance.get<BaseResponse<CityResponse[]>>('/api/cities', { signal });

  if (!data.isSuccess || !Array.isArray(data.result)) {
    throw new Error(data.message || '도시 목록을 불러오지 못했어요.');
  }

  return data.result;
}

export async function getCityAreas(cityId: number, signal?: AbortSignal): Promise<AreaResponse[]> {
  const { data } = await axiosInstance.get<BaseResponse<AreaResponse[]>>(
    `/api/cities/${cityId}/areas`,
    { signal },
  );

  if (!data.isSuccess || !Array.isArray(data.result)) {
    throw new Error(data.message || '지역 목록을 불러오지 못했어요.');
  }

  return data.result;
}
