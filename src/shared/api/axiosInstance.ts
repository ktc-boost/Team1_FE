import { useAuthStore } from '@/features/auth/store/useAuthStore';
import axios from 'axios';
import { handleUnauthorizedRequest } from '@/shared/api/interceptors/handleUnauthorizedRequest';
import { ApiError } from '@/shared/api/error/ApiError';
import * as Sentry from '@sentry/react';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiPublic = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (!error.response) {
      Sentry.captureException(error, {
        tags: { type: 'network_error' },
        extra: { url: originalRequest?.url },
      });
      throw new ApiError('NETWORK_ERROR', 0);
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      return handleUnauthorizedRequest(originalRequest);
    }
    if (error.response.status >= 500) {
      Sentry.withScope((scope) => {
        scope.setTag('type', 'server_error');
        scope.setExtra('url', originalRequest?.url);
        scope.setExtra('status', error.response?.status);
        Sentry.captureException(error);
      });
      throw new ApiError('SERVER_ERROR', 500);
    }
    throw error;
  },
);

export default api;
