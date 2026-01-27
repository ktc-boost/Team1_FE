import { useInfiniteProjectTasksByStatusQuery } from '@/features/task/hooks/query/useInfiniteProjectTasksByStatusQuery';
import type { Status } from '@/features/board/types/boardTypes';
import type { TaskQuery } from '@/features/task/types/taskTypes';
import type { SortBy, Direction } from '@/features/board/types/sortTypes';
import { SORT_BY, DIRECTION } from '@/features/board/constants/sortConstants';

export const useAllProjectTasksQueries = (
  projectId: string,
  enabled: boolean,
  sortBy: SortBy = SORT_BY.CREATED_AT,
  direction: Direction = DIRECTION.ASC,
  search: string,
): Record<Status, TaskQuery> => {
  return {
    TODO: useInfiniteProjectTasksByStatusQuery(projectId, 'TODO', sortBy, direction, search, {
      enabled,
    }),
    PROGRESS: useInfiniteProjectTasksByStatusQuery(
      projectId,
      'PROGRESS',
      sortBy,
      direction,
      search,
      { enabled },
    ),
    REVIEW: useInfiniteProjectTasksByStatusQuery(projectId, 'REVIEW', sortBy, direction, search, {
      enabled,
    }),
    DONE: useInfiniteProjectTasksByStatusQuery(projectId, 'DONE', sortBy, direction, search, {
      enabled,
    }),
  };
};
