import type { ErrorItem, ErrorType } from '@/shared/error/types/error.types';

export const ERROR = {
  TASK: {
    RE_REVIEW_COOLDOWN: {
      type: 'urn:problem:task_re_review_cooldown',
      status: 400,
      detail: '재검토 요청은 10분 간격으로만 가능합니다.',
    },
  },
  MEMBER: {
    ALREADY_JOINED: {
      type: 'urn:problem:member_already_joined',
      status: 409,
      detail: '이미 참여한 멤버입니다.',
    },
  },
  JOIN_CODE: {
    NOT_FOUND: {
      type: 'urn:problem:join_code_not_found',
      status: 404,
      detail: '참가 코드를 찾을 수 없습니다.',
    },
    EXPIRED: {
      type: 'urn:problem:join_code_expired',
      status: 400,
      detail: '만료된 참가 코드입니다.',
    },
  },
  USER: {
    HAS_OWNED_PROJECTS: {
      type: 'urn:problem:member_has_owned_projects',
      status: 409,
      detail: '소유한 프로젝트가 있어 탈퇴할 수 없습니다. 프로젝트를 먼저 삭제해주세요.',
    },
  },
  AI: {
    SERVICE_ERROR: {
      type: 'urn:problem:ai_service_error',
      status: 500,
      detail: 'AI 서비스 처리 중 오류가 발생했습니다.',
    },
  },
} as const;

export const ERROR_MAP: Record<ErrorType, ErrorItem> = Object.values(ERROR)
  .flatMap((errorGroup) => Object.values(errorGroup))
  .reduce(
    (errorMap, errorItem) => {
      errorMap[errorItem.type] = errorItem;

      return errorMap;
    },
    {} as Record<ErrorType, ErrorItem>,
  );
