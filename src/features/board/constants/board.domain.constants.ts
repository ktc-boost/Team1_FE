import { TASK_STATUS } from '@/features/task/constants/task.domain.constants';

// 보드 종류
export const BOARD = {
  STATUS: 'status',
  MEMBER: 'member',
} as const;

// 페이지 종류
export const PAGE = {
  PROJECT: 'project',
  MYTASK: 'myTask',
};

// 보드 키
export const BOARD_KEYS = {
  MY_TASKS: 'myTasks',
  PROJECT_STATUS: 'projectStatus',
  PROJECT_MEMBER: 'projectMember',
} as const;

// 특정 보드 타입에서 컬럼을 렌더링하기 위한 상태 순서 정의 - 현재는 member만 사용하고 있습니다.
export const COLUMN_ORDER = {
  status: [TASK_STATUS.TODO, TASK_STATUS.PROGRESS, TASK_STATUS.REVIEW, TASK_STATUS.DONE],
  member: [TASK_STATUS.PROGRESS, TASK_STATUS.REVIEW, TASK_STATUS.TODO],
} as const;
