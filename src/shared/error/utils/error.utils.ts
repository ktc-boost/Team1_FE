import { ERROR_MAP } from '@/shared/error/constants/error.constants';
import type { ApiError } from '@/shared/error/types/apiError.types';
import type { ErrorType } from '@/shared/error/types/error.types';

export const getErrorMessage = (error: ApiError) => {
  const mapped =
    error.type && error.type in ERROR_MAP ? ERROR_MAP[error.type as ErrorType] : undefined;

  if (mapped) return mapped.detail;

  if (error.errors?.length) return error.errors[0].message;

  return error.detail ?? '요청에 실패했습니다.';
};
