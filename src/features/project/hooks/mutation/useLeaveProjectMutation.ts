import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Project } from '@/features/project/types/projectTypes';
import { projectMembershipApi } from '@/features/project/api/projectMembershipApi';

// 프로젝트 떠나기
export const useLeaveProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: string) => projectMembershipApi.leaveProject(projectId),

    onMutate: async (projectId: string) => {
      await queryClient.cancelQueries({ queryKey: ['projects', 'me'] });
      const previousProjects = queryClient.getQueryData<Project[]>(['projects', 'me']);

      queryClient.setQueryData<Project[]>(
        ['projects', 'me'],
        (old) => old?.filter((p) => p.id !== projectId) ?? [],
      );

      return { previousProjects };
    },

    onError: (error, __, context) => {
      console.error('프로젝트 떠나기 실패:', error);
      if (context?.previousProjects) {
        queryClient.setQueryData(['projects', 'me'], context.previousProjects);
      }
    },

    onSuccess: (_, projectId) => {
      queryClient.removeQueries({ queryKey: ['project', 'me', projectId] });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['projects', 'me'] });
    },
  });
};
