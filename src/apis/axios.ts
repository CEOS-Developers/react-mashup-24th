import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import type { BaseResponse } from '../types/response';
import { clearAccessToken, getAccessToken, refreshAccessToken } from './auth';

type ErrorResponse = BaseResponse<Record<string, string>>;

interface RetryRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const axiosInstance = axios.create({
  baseURL: '/',
  withCredentials: true,
  timeout: 10000,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers.set('Authorization', `Bearer ${accessToken}`);
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError<ErrorResponse>(error) || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as RetryRequestConfig | undefined;
    const code = error.response.data?.code;

    // 토큰 갱신으로 복구할 수 없는 인증 오류는 그대로 전달합니다.
    if (code === 'AUTH_INVALID_GUEST' || code === 'AUTH_INVALID_REFRESH_TOKEN') {
      clearAccessToken();
      return Promise.reject(error);
    }

    if (
      !originalRequest ||
      (code !== 'AUTH_UNAUTHORIZED' && code !== 'AUTH_INVALID_TOKEN' && code !== 'COMMON401')
    ) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      clearAccessToken();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    let accessToken = getAccessToken();

    // 다른 요청이 이미 갱신했다면 새 토큰을 재사용합니다.
    if (!accessToken || originalRequest.headers.get('Authorization') === `Bearer ${accessToken}`) {
      const result = await refreshAccessToken();
      accessToken = result.accessToken;
    }

    originalRequest.headers.set('Authorization', `Bearer ${accessToken}`);
    return axiosInstance(originalRequest);
  },
);

export default axiosInstance;
