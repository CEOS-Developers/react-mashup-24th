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
        if (!axios.isAxiosError<BaseResponse<unknown>>(error) || error.response?.status !== 401) {
          throw error;
        }

        const code = error.response.data?.code;

        // Refresh Token 또는 게스트가 유효하지 않을 때만 새 게스트를 생성합니다.
        if (code !== 'AUTH_INVALID_REFRESH_TOKEN' && code !== 'AUTH_INVALID_GUEST') {
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
