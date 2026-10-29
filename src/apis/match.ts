import type { MatchFavoriteResponse, MatchListParams, MatchListResponse } from '../types/match';
import type { BaseResponse } from '../types/response';
import { normalizeMatchFilters } from '../utils/match';
import axiosInstance from './axios';

export async function getMatches(
  params: MatchListParams,
  signal?: AbortSignal,
): Promise<MatchListResponse> {
  const { data } = await axiosInstance.get<BaseResponse<MatchListResponse>>('/api/matches', {
    params,
    paramsSerializer: { indexes: null },
    signal,
  });

  if (!data.isSuccess || !data.result) {
    throw new Error(data.message || '매치 목록을 불러오지 못했어요.');
  }

  return data.result;
}

export async function searchMatches(
  { date, page = 0, size = 20, hideClosed = true, ...filters }: MatchListParams,
  signal?: AbortSignal,
): Promise<MatchListResponse> {
  const { data } = await axiosInstance.post<BaseResponse<MatchListResponse>>(
    '/api/matches/search',
    { date, ...normalizeMatchFilters(filters), hideClosed, page, size },
    { signal },
  );

  if (!data.isSuccess || !data.result) {
    throw new Error(data.message || '필터에 맞는 매치를 불러오지 못했어요.');
  }

  return data.result;
}

export async function setMatchFavorite(
  matchId: number,
  isFavorite: boolean,
): Promise<MatchFavoriteResponse> {
  const url = `/api/matches/${matchId}/favorite`;
  const { data } = isFavorite
    ? await axiosInstance.put<BaseResponse<MatchFavoriteResponse>>(url)
    : await axiosInstance.delete<BaseResponse<MatchFavoriteResponse>>(url);

  if (!data.isSuccess || !data.result) {
    throw new Error(data.message || '찜 상태를 변경하지 못했어요.');
  }

  return data.result;
}
