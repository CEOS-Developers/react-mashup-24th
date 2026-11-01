import axios, { type AxiosRequestConfig } from "axios";
import { ApiError, type ApiResponse } from "../types/api";

// 항상 같은 주소(/api)로 요청하고, 백엔드로는 프록시가 대신 전달합니다.
// - 개발: Vite 프록시 (vite.config.ts, .env 의 VITE_API_BASE_URL)
// - 배포: Vercel rewrites (vercel.json)

export const client = axios.create({
  baseURL: "/api",
  timeout: 5_000,
});

client.interceptors.response.use(
  // 200 이어도 isSuccess 가 false 면 실패로 처리합니다.
  (response) => {
    const body = response.data as ApiResponse<unknown>;
    if (!body.isSuccess) {
      throw new ApiError(body.code, body.message, response.status);
    }
    return response;
  },
  // 400·404 등은 서버가 보낸 { code, message } 를 ApiError 로 바꿔서 던집니다.
  (error) => {
    if (
      axios.isAxiosError<ApiResponse<null>>(error) &&
      error.response?.data?.code
    ) {
      const { code, message } = error.response.data;
      throw new ApiError(code, message, error.response.status);
    }
    throw error;
  },
);

// GET 요청 후 응답의 result 만 돌려줍니다.
export async function get<T>(url: string, config?: AxiosRequestConfig) {
  const { data } = await client.get<ApiResponse<T>>(url, config);
  return data.result;
}

// POST 요청도 공통 응답 처리 후 result 만 돌려줍니다.
export async function post<T, D>(
  url: string,
  body: D,
  config?: AxiosRequestConfig,
) {
  const { data } = await client.post<ApiResponse<T>>(url, body, config);
  return data.result;
}
