import { useQuery } from '@tanstack/react-query';
import { projectApi } from '@/features/project/api/projectApi';
import type { Project } from '@/features/project/types/projectTypes';

// 프로젝트 정보 조회
export const useProjectQuery = (projectId?: string) => {
  return useQuery<Project>({
    queryKey: ['project', 'me', projectId],
    queryFn: () => projectApi.fetchProject(projectId!),
    enabled: !!projectId,
  });
};
