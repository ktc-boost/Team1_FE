import { useQuery } from '@tanstack/react-query';
import { taskApi } from '@/features/task/api/taskApi';
import type {
  ProjectTaskCountByMemberMap,
  ProjectTaskCountByMemberResponse,
} from '@/features/task/types/taskTypes';
import { TASK_QUERY_KEYS } from '@/features/task/constants/taskQueryKeys';
import { useBoardSearchStore } from '@/features/board/store/useBoardSearchStore';
import { BOARD_KEYS } from '@/features/board/constants/boardConstants';

export const useProjectTaskCountByMemberQuery = (projectId?: string) => {
  const search = useBoardSearchStore((state) => state.searchMap[BOARD_KEYS.PROJECT_MEMBER]);
  const baseKey = TASK_QUERY_KEYS.projectCountMember(projectId ?? '');
  const queryKey = search ? [...baseKey, search] : baseKey;

  return useQuery<Record<string, ProjectTaskCountByMemberMap>, Error>({
    queryKey,
    queryFn: async () => {
      const res: ProjectTaskCountByMemberResponse[] = await taskApi.fetchProjectTaskCountByMember(
        projectId ?? '',
        search,
      );

      const map: Record<string, ProjectTaskCountByMemberMap> = {};
      res.forEach((item) => {
        map[item.memberId] = {
          todo: item.todo,
          progress: item.progress,
          review: item.review,
        };
      });
      return map;
    },
    enabled: !!projectId,
  });
};
