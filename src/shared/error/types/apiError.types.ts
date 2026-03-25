import type { AxiosError } from 'axios';

export interface ApiErrorResponse {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  errors?: {
    field: string;
    message: string;
  }[];
}

export class ApiError extends Error {
  public status: number;
  public type?: string;
  public detail?: string;
  public errors?: {
    field: string;
    message: string;
  }[];
  public originalError?: AxiosError;

  constructor(axiosError: AxiosError<ApiErrorResponse>) {
    const data = axiosError.response?.data;

    super(data?.detail || '요청 처리 중 오류가 발생했습니다.');

    this.name = 'ApiError';

    this.status = axiosError.response?.status ?? 500;
    this.type = data?.type;
    this.detail = data?.detail;
    this.errors = data?.errors;
    this.originalError = axiosError;
  }
}
