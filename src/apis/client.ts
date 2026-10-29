import axios, { isAxiosError, type AxiosRequestConfig } from 'axios';
import type { ApiResponse } from '../types/api';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10_000,
});

/** API 호출 실패를 한 가지 형태로 다루기 위한 에러 */
export class ApiError extends Error {
  /** HTTP 상태 코드. 네트워크 오류나 시간 초과면 없음 */
  status?: number;
  /** 서버가 내려준 코드. 감싸지 않은 에러 응답이면 없음 */
  code?: string;

  constructor(message: string, options: { status?: number; code?: string } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = options.status;
    this.code = options.code;
  }
}

const isApiResponse = (body: unknown): body is ApiResponse<unknown> =>
  typeof body === 'object' && body !== null && 'isSuccess' in body;

/**
 * API를 호출하고 감싸진 응답에서 `result`만 꺼내 돌려준다.
 * 실패하면 항상 ApiError를 던진다.
 */
export async function request<T>(config: AxiosRequestConfig): Promise<T> {
  try {
    const { data } = await client.request<ApiResponse<T>>(config);

    if (!data.isSuccess) {
      throw new ApiError(data.message, { code: data.code });
    }
    return data.result;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    if (isAxiosError(error)) {
      // 존재하지 않는 id처럼 서버가 응답 형태로 감싸지 않고 에러를 줄 때도 있다
      const body: unknown = error.response?.data;
      const wrapped = isApiResponse(body) ? body : null;

      throw new ApiError(wrapped?.message ?? error.message, {
        status: error.response?.status,
        code: wrapped?.code,
      });
    }
    throw error;
  }
}
