import * as Sentry from '@sentry/react';
import axios, { isAxiosError } from 'axios';
import { handleUnauthorizedRequest } from '@/shared/api/interceptors/handleUnauthorizedRequest';
import { ApiError } from '@/shared/error/types/apiError.types';
import { useAuthStore } from '@/features/auth/store/useAuthStore';

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

api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();

  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (!isAxiosError(error)) {
      Sentry.captureException(error);
      throw error;
    }

    if (!error.response) {
      Sentry.captureException(error, {
        tags: { type: 'network_error' },
        extra: { url: originalRequest?.url },
      });
      throw new ApiError(error);
    }

    const status = error.response.status;

    if (status === 401 && originalRequest && !originalRequest._retry) {
      return handleUnauthorizedRequest(originalRequest);
    }

    if (status >= 500) {
      Sentry.withScope((scope) => {
        scope.setTag('type', 'server_error');
        scope.setExtra('url', originalRequest?.url);
        scope.setExtra('status', status);
        Sentry.captureException(error);
      });
    }

    throw new ApiError(error);
  },
);
