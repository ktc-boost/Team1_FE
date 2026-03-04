import { useInfiniteMyTasksByStatusQuery } from '@/features/task/hooks/query/useInfiniteMyTasksByStatusQuery';
import type { Direction, SortBy } from '@/features/board/types/board.sort.types';
import { DIRECTION, SORT_BY } from '@/features/board/constants/board.sort.constants';
import type { TaskStatus } from '@/features/task/types/task.domain.types';
import type { TaskQuery } from '@/features/task/types/task.query.types';
import { TASK_STATUS } from '@/features/task/constants/task.domain.constants';

export const useAllMyTasksQueries = (
  enabled: boolean,
  sortBy: SortBy = SORT_BY.CREATED_AT,
  direction: Direction = DIRECTION.ASC,
  search: string,
): Record<TaskStatus, TaskQuery> => {
  return {
    TODO: useInfiniteMyTasksByStatusQuery(TASK_STATUS.TODO, sortBy, direction, search, { enabled }),
    PROGRESS: useInfiniteMyTasksByStatusQuery(TASK_STATUS.PROGRESS, sortBy, direction, search, {
      enabled,
    }),
    REVIEW: useInfiniteMyTasksByStatusQuery(TASK_STATUS.REVIEW, sortBy, direction, search, {
      enabled,
    }),
    DONE: useInfiniteMyTasksByStatusQuery(TASK_STATUS.DONE, sortBy, direction, search, { enabled }),
  };
};
