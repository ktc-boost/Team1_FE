import { useQuery } from '@tanstack/react-query';
import { projectApi } from '@/features/project/api/projectApi';
import type { Project } from '@/features/project/types/projectTypes';
import { PROJECT_QUERY_KEYS } from '@/features/project/constants/projectQueryKeys';

// 내 참여 프로젝트 목록 조회
export const useProjectsQuery = () => {
  return useQuery<Project[]>({
    queryKey: PROJECT_QUERY_KEYS.myProjects(),
    queryFn: projectApi.fetchProjects,
  });
};
