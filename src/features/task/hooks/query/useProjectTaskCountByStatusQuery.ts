import { useQuery } from '@tanstack/react-query';
import { taskApi } from '@/features/task/api/taskApi';
import { TASK_QUERY_KEYS } from '@/features/task/constants/task.query.constants';
import type { TaskCountByStatusMap } from '@/features/task/types/task.ui.types';

// 프로젝트 상태별 할 일 개수 조회 (전체)
export const useProjectTaskCountByStatusQuery = (
  projectId?: string,
  enabled = true,
  search?: string,
) => {
  const baseKey = TASK_QUERY_KEYS.projectCountStatus(projectId ?? '');
  const queryKey = search ? [...baseKey, search] : baseKey;

  return useQuery<TaskCountByStatusMap, Error>({
    queryKey,
    queryFn: () => taskApi.fetchProjectTaskCountByStatus(projectId ?? '', search),
    enabled: enabled && !!projectId,
  });
};
