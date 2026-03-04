import type {
  MemberBoardTaskStatusKey,
  TaskStatusKey,
} from '@/features/task/types/task.query.types';

// UI나 내부 로직에서 사용하기 위한 팀원별 개수 맵 타입
export type ProjectTaskCountByMemberMap = Record<MemberBoardTaskStatusKey, number>;

// UI나 내부 로직에서 사용하기 위한 상태별 개수 맵 타입
export type TaskCountByStatusMap = Record<TaskStatusKey, number>;
