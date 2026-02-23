import type { Direction, SortBy } from '@/features/board/types/board.sort.types';
import type { TaskStatus } from '@/features/task/types/task.domain.types';

export const TASK_QUERY_KEYS = {
  root: ['tasks'] as const,

  project: (
    projectId: string,
    status: TaskStatus,
    sortBy: SortBy,
    direction: Direction,
    search?: string,
  ) =>
    [
      ...TASK_QUERY_KEYS.root,
      'project',
      projectId,
      status,
      sortBy,
      direction,
      search ?? '',
    ] as const,

  meStatus: (status: TaskStatus, sortBy: SortBy, direction: Direction, search?: string) =>
    [...TASK_QUERY_KEYS.root, 'me', status, sortBy, direction, search ?? ''] as const,

  member: (projectId: string, memberId: string, search?: string) =>
    [...TASK_QUERY_KEYS.root, 'project', projectId, 'member', memberId, search ?? ''] as const,

  detail: (projectId: string, taskId: string) =>
    [...TASK_QUERY_KEYS.root, 'detail', projectId, taskId] as const,

  projectCountStatus: (projectId: string) =>
    [...TASK_QUERY_KEYS.root, 'project', projectId, 'countStatus'] as const,

  projectCountMember: (projectId: string) =>
    [...TASK_QUERY_KEYS.root, 'project', projectId, 'countMember'] as const,

  meCountStatus: () => [...TASK_QUERY_KEYS.root, 'me', 'countStatus'] as const,

  requestReview: (projectId: string, taskId: string) =>
    [...TASK_QUERY_KEYS.root, 'requestReview', projectId, taskId] as const,
};
