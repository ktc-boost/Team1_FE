import { useQuery } from '@tanstack/react-query';
import { taskApi } from '@/features/task/api/taskApi';
import { TASK_QUERY_KEYS } from '@/features/task/constants/taskQueryKeys';
import type { TaskCountByStatusMap } from '@/features/task/types/taskTypes';

export const useMyTaskCountByStatusQuery = (enabled = true, search?: string) => {
  const baseKey = TASK_QUERY_KEYS.meCountStatus();
  const queryKey = search ? [...baseKey, search] : baseKey;

  return useQuery<TaskCountByStatusMap, Error>({
    queryKey, // 배열로 전달
    queryFn: () => taskApi.fetchMyTaskCountByStatus(search),
    enabled,
  });
};
