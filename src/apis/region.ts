import type { AreaResponse, CityResponse, FavoriteAreaResponse } from '../types/region';
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

export async function getFavoriteAreas(signal?: AbortSignal): Promise<AreaResponse[]> {
  const { data } = await axiosInstance.get<BaseResponse<AreaResponse[]>>('/api/users/me/areas', {
    signal,
  });

  if (!data.isSuccess || !Array.isArray(data.result)) {
    throw new Error(data.message || '관심 지역을 불러오지 못했어요.');
  }

  return data.result;
}

export async function updateFavoriteArea(
  areaId: number,
  isFavorite: boolean,
): Promise<FavoriteAreaResponse> {
  const url = `/api/areas/${areaId}/favorite`;
  const { data } = isFavorite
    ? await axiosInstance.put<BaseResponse<FavoriteAreaResponse>>(url)
    : await axiosInstance.delete<BaseResponse<FavoriteAreaResponse>>(url);

  if (
    !data.isSuccess ||
    data.result?.areaId !== areaId ||
    typeof data.result.isFavorite !== 'boolean'
  ) {
    throw new Error(data.message || '관심 지역을 변경하지 못했어요.');
  }

  return data.result;
}
