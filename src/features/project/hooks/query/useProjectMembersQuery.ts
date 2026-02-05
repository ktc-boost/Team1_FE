import { useQuery } from '@tanstack/react-query';
import { projectApi } from '@/features/project/api/projectApi';
import type { Member } from '@/features/user/types/userTypes';
import { PROJECT_QUERY_KEYS } from '@/features/project/constants/projectQueryKeys';

// 프로젝트 멤버 조회
export const useProjectMembersQuery = (projectId: string | undefined) => {
  return useQuery<Member[]>({
    queryKey: PROJECT_QUERY_KEYS.members(projectId as string),
    queryFn: () => {
      if (!projectId) throw new Error('Project ID가 필요합니다.');
      return projectApi.fetchProjectMembers(projectId);
    },
    enabled: !!projectId,
  });
};
