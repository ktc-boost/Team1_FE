import axios, { isAxiosError, type AxiosRequestConfig } from 'axios';
import { apiPublic } from '@/shared/api/axiosInstance';
import { ApiError } from '@/shared/error/types/apiError.types';
import { useAuthStore } from '@/features/auth/store/useAuthStore';

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

export const handleUnauthorizedRequest = async (originalRequest: AxiosRequestConfigWithRetry) => {
  originalRequest._retry = true;

  try {
    const { data } = await apiPublic.post(`/auth/reissue`, {}, { withCredentials: true });
    const newAccessToken = data.accessToken;

    useAuthStore.getState().setAuth({ accessToken: newAccessToken });

    if (!originalRequest.headers) originalRequest.headers = {};

    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

    return axios(originalRequest);
  } catch (error) {
    const clearAuth = useAuthStore.getState().clearAuth;
    clearAuth();

    if (isAxiosError(error)) return Promise.reject(new ApiError(error));

    return Promise.reject(error);
  }
};
