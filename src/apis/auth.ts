import axios from 'axios';
import type { BaseResponse } from '../types/response';

export interface AuthTokenResult {
  userId: number;
  accessToken: string;
  tokenType: 'Bearer';
}

const authClient = axios.create({
  baseURL: '/',
  withCredentials: true,
  timeout: 10000,
});

let accessToken: string | null = null;
let refreshPromise: Promise<AuthTokenResult> | null = null;
let initializationPromise: Promise<void> | null = null;

export const getAccessToken = () => accessToken;

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const clearAccessToken = () => {
  accessToken = null;
};

export const createGuest = async (): Promise<AuthTokenResult> => {
  const { data } = await authClient.post<BaseResponse<AuthTokenResult>>(
    '/api/auth/guest',
    undefined,
    {
      headers: { Authorization: false },
    },
  );

  if (!data.isSuccess || !data.result?.accessToken) {
    throw new Error(data.message);
  }

  setAccessToken(data.result.accessToken);
  return data.result;
};

export const refreshAccessToken = (): Promise<AuthTokenResult> => {
  if (!refreshPromise) {
    // HttpOnly refreshToken 쿠키의 전송과 Set-Cookie 반영은 브라우저가 처리합니다.
    refreshPromise = authClient
      .post<BaseResponse<AuthTokenResult>>('/api/auth/refresh', undefined, {
        headers: { Authorization: false },
      })
      .then(({ data }) => {
        if (!data.isSuccess || !data.result?.accessToken) {
          throw new Error(data.message);
        }

        setAccessToken(data.result.accessToken);
        return data.result;
      })
      .catch((error: unknown) => {
        clearAccessToken();
        throw error;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

export const initializeAuth = (): Promise<void> => {
  if (accessToken) {
    return Promise.resolve();
  }

  if (!initializationPromise) {
    initializationPromise = (async () => {
      try {
        await refreshAccessToken();
      } catch (error: unknown) {
        // 갱신 API의 401만 인증 복원 불가로 처리합니다. 서버/네트워크 오류는 전달합니다.
        if (!axios.isAxiosError(error) || error.response?.status !== 401) {
          throw error;
        }

        await createGuest();
      }
    })().finally(() => {
      initializationPromise = null;
    });
  }

  return initializationPromise;
};
