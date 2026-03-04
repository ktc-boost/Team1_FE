import type { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import type { Member } from '@/features/user/types/userTypes';
import type { TASK_STATUS_KEY } from '@/features/task/constants/task.domain.constants';
import type { TaskListItem, TaskStatus } from '@/features/task/types/task.domain.types';

// 'todo' | 'progress' | 'review' | 'done'
export type TaskStatusKey = (typeof TASK_STATUS_KEY)[TaskStatus];

// 'todo' | 'progress' | 'review'
export type MemberBoardTaskStatusKey = Exclude<TaskStatusKey, 'done'>;

// 프로젝트 팀원별 할 일 개수 API 응답 타입
export type ProjectTaskCountByMemberResponse = {
  projectId: string;
  memberId: string;
  todo: number;
  progress: number;
  review: number;
};

// 할 일 승인 관련 응답 타입
export interface TaskApproveResponse {
  taskId: string;
  approvedCount: number;
  requiredReviewerCount: number;
}

// 할 일 목록 조회 API 응답 타입 (커서 기반 페이징 포함)
export type TaskListResponse = {
  tasks: TaskListItem[];
  count: number;
  nextCursor?: string;
  hasNext: boolean;
};

// useInfiniteQuery로 반환된 객체를 한 번에 명시하는 타입
export type TaskQuery = UseInfiniteQueryResult<InfiniteData<TaskListResponse, unknown>, Error>;

// 프로젝트 할 일 목록 조회 (팀원 기준) API 응답 타입
export type MemberTaskListResponse = {
  member: Member;
  tasks: TaskListItem[];
  count: number;
  nextCursor?: string;
  hasNext: boolean;
};

export interface UseInfiniteTasksOptions {
  enabled?: boolean;
}

// 프로젝트 상태별 할 일 개수 API 응답 타입
export type ProjectTaskCountByStatusResponse = {
  projectId: string;
  todo: number;
  progress: number;
  review: number;
  done: number;
};

// 나의 할 일 개수 API 응답 타입
export type MyTaskCountByStatusResponse = {
  memberId: string;
  todo: number;
  progress: number;
  review: number;
  done: number;
};
