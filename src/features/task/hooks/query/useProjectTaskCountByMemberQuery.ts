import { useQuery } from '@tanstack/react-query';
import { taskApi } from '@/features/task/api/taskApi';
import type { ProjectTaskCountByMemberResponse } from '@/features/task/types/task.query.types';
import type { ProjectTaskCountByMemberMap } from '@/features/task/types/task.ui.types';
import { TASK_QUERY_KEYS } from '@/features/task/constants/task.query.constants';
import { useBoardSearchStore } from '@/features/board/store/useBoardSearchStore';
import { BOARD_KEYS } from '@/features/board/constants/board.domain.constants';

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
