import axios, { type AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { apiPublic } from '@/shared/api/axiosInstance';
import { ApiError } from '@/shared/api/error/ApiError';
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
  } catch {
    const clearAuth = useAuthStore.getState().clearAuth;
    clearAuth();
    return Promise.reject(new ApiError('UNAUTHORIZED', 401));
  }
};
