import { useQuery } from '@tanstack/react-query';
import { projectApi } from '@/features/project/api/projectApi';
import type { Project } from '@/features/project/types/projectTypes';
import { PROJECT_QUERY_KEYS } from '@/features/project/constants/projectQueryKeys';

// 프로젝트 정보 조회
export const useProjectQuery = (projectId: string | undefined) => {
  return useQuery<Project>({
    queryKey: PROJECT_QUERY_KEYS.detail(projectId as string),
    queryFn: () => {
      if (!projectId) throw new Error('Project ID가 필요합니다.');
      return projectApi.fetchProject(projectId);
    },
    enabled: !!projectId,
  });
};
