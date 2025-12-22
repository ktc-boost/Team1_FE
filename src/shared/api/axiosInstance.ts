import { useAuthStore } from '@/features/auth/store/useAuthStore';
import axios from 'axios';
import { handleUnauthorizedRequest } from '@/shared/api/interceptors/handleUnauthorizedRequest';
import { ApiError } from '@/shared/api/error/ApiError';
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
      throw new ApiError('NETWORK_ERROR', 0);
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      return handleUnauthorizedRequest(originalRequest);
    }
    if (error.response.status === 500) {
      throw new ApiError('SERVER_ERROR', 500);
    }
    throw error;
  },
);

export default api;
