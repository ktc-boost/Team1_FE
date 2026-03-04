import { useInfiniteProjectTasksByStatusQuery } from '@/features/task/hooks/query/useInfiniteProjectTasksByStatusQuery';
import { TASK_STATUS } from '@/features/task/constants/task.domain.constants';
import type { TaskStatus } from '@/features/task/types/task.domain.types';
import type { TaskQuery } from '@/features/task/types/task.query.types';
import type { SortBy, Direction } from '@/features/board/types/board.sort.types';
import { SORT_BY, DIRECTION } from '@/features/board/constants/board.sort.constants';

export const useAllProjectTasksQueries = (
  projectId: string,
  enabled: boolean,
  sortBy: SortBy = SORT_BY.CREATED_AT,
  direction: Direction = DIRECTION.ASC,
  search: string,
): Record<TaskStatus, TaskQuery> => {
  return {
    TODO: useInfiniteProjectTasksByStatusQuery(
      projectId,
      TASK_STATUS.TODO,
      sortBy,
      direction,
      search,
      {
        enabled,
      },
    ),
    PROGRESS: useInfiniteProjectTasksByStatusQuery(
      projectId,
      TASK_STATUS.PROGRESS,
      sortBy,
      direction,
      search,
      { enabled },
    ),
    REVIEW: useInfiniteProjectTasksByStatusQuery(
      projectId,
      TASK_STATUS.REVIEW,
      sortBy,
      direction,
      search,
      {
        enabled,
      },
    ),
    DONE: useInfiniteProjectTasksByStatusQuery(
      projectId,
      TASK_STATUS.DONE,
      sortBy,
      direction,
      search,
      {
        enabled,
      },
    ),
  };
};
