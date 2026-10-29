import axios from 'axios';
import type {
  JudgmentSearchApiResponse,
  JudgmentSearchParams,
  JudgmentSearchResponse,
} from '../types/judgment';

export async function searchJudgments(
  params: JudgmentSearchParams,
  signal?: AbortSignal,
): Promise<JudgmentSearchResponse> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

  if (!baseUrl) {
    throw new Error('API 서버 주소가 설정되지 않았습니다.');
  }

  const keyword = params.keyword.trim();

  if (!keyword) {
    throw new Error('검색어를 입력해 주세요.');
  }

  const { data } = await axios.get<JudgmentSearchApiResponse>(
    `${baseUrl.replace(/\/+$/, '')}/api/v1/judgments/search`,
    {
      params: { ...params, keyword },
      signal,
      timeout: 15000,
    },
  );

  if (!data.isSuccess || !data.result) {
    throw new Error(data.message || '판례 검색에 실패했습니다.');
  }

  return data.result;
}
