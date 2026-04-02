import { isAxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { api, apiPublic } from '@/shared/api/axiosInstance';
import { ApiError } from '@/shared/error/types/apiError.types';
import { useAuthStore } from '@/features/auth/store/useAuthStore';

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

interface QueueItem {
  resolve: (value: AxiosResponse) => void;
  reject: (reason?: unknown) => void;
  originalRequest: AxiosRequestConfigWithRetry;
}

let isRefreshing = false;
let requestQueue: QueueItem[] = [];

// 첫번째 요청에 대한 재발급 성공/실패시 requestQueue에 있는 나머지 요청을 실행
const processQueue = async (error: unknown, accessToken?: string) => {
  const queue = [...requestQueue];
  requestQueue = [];

  for (const item of queue) {
    // 실패시 (첫번째 재발급이 실패)
    if (error || !accessToken) {
      item.reject(error);
      continue;
    }

    try {
      if (!item.originalRequest.headers) {
        item.originalRequest.headers = {};
      }

      item.originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      const response = await api(item.originalRequest);
      item.resolve(response);
    } catch (requestError) {
      if (isAxiosError(requestError)) {
        item.reject(new ApiError(requestError));
        continue;
      }

      item.reject(requestError);
    }
  }
};
export const handleUnauthorizedRequest = async (originalRequest: AxiosRequestConfigWithRetry) => {
  originalRequest._retry = true;

  if (isRefreshing) {
    return new Promise<AxiosResponse>((resolve, reject) => {
      requestQueue.push({
        resolve,
        reject,
        originalRequest,
      });
    });
  }

  isRefreshing = true;

  try {
    const { data } = await apiPublic.post('/auth/reissue', {}, { withCredentials: true });
    const newAccessToken = data.accessToken;

    useAuthStore.getState().setAuth({ accessToken: newAccessToken });

    await processQueue(null, newAccessToken);

    if (!originalRequest.headers) {
      originalRequest.headers = {};
    }

    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

    return api(originalRequest);
  } catch (error) {
    await processQueue(error);

    useAuthStore.getState().clearAuth();

    if (isAxiosError(error)) {
      return Promise.reject(new ApiError(error));
    }

    return Promise.reject(error);
  } finally {
    isRefreshing = false;
  }
};
