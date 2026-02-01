import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectMembershipApi } from '@/features/project/api/projectMembershipApi';
import type { Member } from '@/features/user/types/userTypes';

// 프로젝트 멤버 추방
export const useKickProjectMemberMutation = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (targetMemberId: string) =>
      projectMembershipApi.kickProjectMember(projectId, targetMemberId),

    onMutate: async (targetMemberId) => {
      await queryClient.cancelQueries({ queryKey: ['project', 'member', projectId] });

      const previousMembers = queryClient.getQueryData<Member[]>(['project', 'member', projectId]);

      queryClient.setQueryData<Member[]>(
        ['project', 'member', projectId],
        (old) => old?.filter((m) => m.id !== targetMemberId) ?? [],
      );

      return { previousMembers };
    },

    onError: (error, _, context) => {
      console.error('프로젝트 멤버 추방 실패:', error);
      if (context?.previousMembers) {
        queryClient.setQueryData(['project', 'member', projectId], context.previousMembers);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', 'member', projectId] });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['project', 'member', projectId] });
    },
  });
};
