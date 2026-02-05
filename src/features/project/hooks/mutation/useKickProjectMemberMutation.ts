import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectMembershipApi } from '@/features/project/api/projectMembershipApi';
import type { Member } from '@/features/user/types/userTypes';
import { PROJECT_QUERY_KEYS } from '@/features/project/constants/projectQueryKeys';

// 프로젝트 멤버 추방
export const useKickProjectMemberMutation = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (targetMemberId: string) =>
      projectMembershipApi.kickProjectMember(projectId, targetMemberId),

    onMutate: async (targetMemberId) => {
      await queryClient.cancelQueries({ queryKey: PROJECT_QUERY_KEYS.members(projectId) });

      const previousMembers = queryClient.getQueryData<Member[]>(
        PROJECT_QUERY_KEYS.members(projectId),
      );

      queryClient.setQueryData<Member[]>(
        PROJECT_QUERY_KEYS.members(projectId),
        (old) => old?.filter((m) => m.id !== targetMemberId) ?? [],
      );

      return { previousMembers };
    },

    onError: (error, _, context) => {
      console.error('프로젝트 멤버 추방 실패:', error);
      if (context?.previousMembers) {
        queryClient.setQueryData(PROJECT_QUERY_KEYS.members(projectId), context.previousMembers);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_QUERY_KEYS.members(projectId) });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_QUERY_KEYS.members(projectId) });
    },
  });
};
