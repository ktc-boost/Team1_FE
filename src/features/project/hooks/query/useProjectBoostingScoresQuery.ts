import { useQuery } from '@tanstack/react-query';
import type { ProjectBoostingScores } from '@/features/project/types/projectTypes';
import { projectApi } from '@/features/project/api/projectApi';
import { PROJECT_QUERY_KEYS } from '@/features/project/constants/projectQueryKeys';

// 프로젝트 공헌도 점수 조회
export const useProjectBoostingScoresQuery = (projectId: string | undefined) => {
  return useQuery<ProjectBoostingScores>({
    queryKey: PROJECT_QUERY_KEYS.boostingScores(projectId as string),
    queryFn: () => {
      if (!projectId) throw new Error('Project ID가 필요합니다.');
      return projectApi.fetchProjectBoostingScores(projectId);
    },
    enabled: !!projectId,
  });
};
