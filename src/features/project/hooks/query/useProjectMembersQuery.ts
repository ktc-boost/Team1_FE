import { useQuery } from '@tanstack/react-query';
import { projectApi } from '@/features/project/api/projectApi';
import type { Member } from '@/features/user/types/userTypes';

// 프로젝트 멤버 조회
export const useProjectMembersQuery = (projectId?: string) => {
  return useQuery<Member[]>({
    queryKey: ['project', 'member', projectId],
    queryFn: () => projectApi.fetchProjectMembers(projectId!),
    enabled: !!projectId,
  });
};
