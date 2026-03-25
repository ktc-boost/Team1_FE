import type { ERROR } from '@/shared/error/constants/error.constants';

export type ErrorItem = {
  [K in keyof typeof ERROR]: (typeof ERROR)[K][keyof (typeof ERROR)[K]];
}[keyof typeof ERROR];

export type ErrorType = ErrorItem['type'];
