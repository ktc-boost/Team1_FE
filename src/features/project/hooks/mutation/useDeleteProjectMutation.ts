import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectApi } from '@/features/project/api/projectApi';
import type { Project } from '@/features/project/types/projectTypes';

// 프로젝트 삭제
export const useDeleteProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: string) => projectApi.deleteProject(projectId),

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
      console.error('프로젝트 삭제 실패:', error);
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
