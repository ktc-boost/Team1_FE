import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectApi } from '@/features/project/api/projectApi';
import type { Project } from '@/features/project/types/projectTypes';

type UpdateProjectParams = {
  projectId: string;
  updatedData: Partial<Project>;
};

// 프로젝트 수정
export const useUpdateProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, updatedData }: UpdateProjectParams) =>
      projectApi.updateProject(projectId, updatedData),

    onMutate: async ({ projectId, updatedData }) => {
      await queryClient.cancelQueries({ queryKey: ['projects', 'me'] });
      const previousProjects = queryClient.getQueryData<Project[]>(['projects', 'me']);

      queryClient.setQueryData<Project[]>(
        ['projects', 'me'],
        (old) => old?.map((p) => (p.id === projectId ? { ...p, ...updatedData } : p)) ?? [],
      );
      return { previousProjects };
    },

    onError: (error, __, context) => {
      console.error('프로젝트 수정 실패:', error);
      if (context?.previousProjects) {
        queryClient.setQueryData(['projects', 'me'], context.previousProjects);
      }
    },

    onSuccess: (updatedProject) => {
      queryClient.setQueryData(['project', 'me', updatedProject.id], updatedProject);
      queryClient.setQueryData<Project[]>(
        ['projects', 'me'],
        (old) => old?.map((p) => (p.id === updatedProject.id ? updatedProject : p)) ?? [],
      );
    },

    onSettled: (_, __, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ['project', 'me', projectId] });
      queryClient.invalidateQueries({ queryKey: ['projects', 'me'] });
    },
  });
};
