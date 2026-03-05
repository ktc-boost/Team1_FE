import { useInfiniteQuery } from '@tanstack/react-query';
import { taskApi } from '@/features/task/api/taskApi';
import type {
  TaskListResponse,
  UseInfiniteTasksOptions,
} from '@/features/task/types/task.query.types';
import { TASK_QUERY_KEYS } from '@/features/task/constants/task.query.constants';
import type { Direction, SortBy } from '@/features/board/types/board.sort.types';
import { DIRECTION, SORT_BY } from '@/features/board/constants/board.sort.constants';
import type { TaskStatus } from '@/features/task/types/task.domain.types';

// 프로젝트 할 일 목록 조회 (상태)
export const useInfiniteProjectTasksByStatusQuery = (
  projectId: string,
  status: TaskStatus,
  sortBy: SortBy = SORT_BY.CREATED_AT,
  direction: Direction = DIRECTION.ASC,
  search: string = '',
  options?: UseInfiniteTasksOptions,
) => {
  return useInfiniteQuery<TaskListResponse, Error>({
    queryKey: TASK_QUERY_KEYS.project(projectId, status, sortBy, direction, search),
    queryFn: ({ pageParam }) =>
      taskApi.fetchProjectTasksByStatus(
        projectId,
        typeof pageParam === 'string' ? pageParam : undefined,
        status,
        6,
        sortBy,
        direction,
        search,
      ),
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursor : undefined),
    initialPageParam: undefined,
    ...options,
    enabled: !!projectId && options?.enabled !== false,
  });
};
