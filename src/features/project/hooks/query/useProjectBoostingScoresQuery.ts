import { useQuery } from '@tanstack/react-query';
import type { ProjectBoostingScores } from '@/features/project/types/projectTypes';
import { projectApi } from '@/features/project/api/projectApi';

// 프로젝트 공헌도 점수 조회
export const useProjectBoostingScoresQuery = (projectId?: string) => {
  return useQuery<ProjectBoostingScores>({
    queryKey: ['project', projectId, 'boosting'],
    queryFn: () => projectApi.fetchProjectBoostingScores(projectId!),
    enabled: !!projectId,
  });
};
