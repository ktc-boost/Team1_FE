import { useInfiniteMyTasksByStatusQuery } from '@/features/task/hooks/query/useInfiniteMyTasksByStatusQuery';
import type { Status } from '@/features/board/types/boardTypes';
import type { TaskQuery } from '@/features/task/types/taskTypes';
import type { Direction, SortBy } from '@/features/board/types/sortTypes';
import { DIRECTION, SORT_BY } from '@/features/board/constants/sortConstants';

export const useAllMyTasksQueries = (
  enabled: boolean,
  sortBy: SortBy = SORT_BY.CREATED_AT,
  direction: Direction = DIRECTION.ASC,
  search: string,
): Record<Status, TaskQuery> => {
  return {
    TODO: useInfiniteMyTasksByStatusQuery('TODO', sortBy, direction, search, { enabled }),
    PROGRESS: useInfiniteMyTasksByStatusQuery('PROGRESS', sortBy, direction, search, { enabled }),
    REVIEW: useInfiniteMyTasksByStatusQuery('REVIEW', sortBy, direction, search, { enabled }),
    DONE: useInfiniteMyTasksByStatusQuery('DONE', sortBy, direction, search, { enabled }),
  };
};
