import type { AxiosError } from 'axios';

export class ApiError extends Error {
  public status: number;
  public originalError?: AxiosError;

  constructor(message: string, status: number, originalError?: AxiosError) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.originalError = originalError;
  }
}


