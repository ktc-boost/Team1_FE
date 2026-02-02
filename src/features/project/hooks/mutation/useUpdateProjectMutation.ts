import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectApi } from '@/features/project/api/projectApi';
import type { Project } from '@/features/project/types/projectTypes';
import { isAxiosError } from 'axios';

interface UpdateProjectParams {
  projectId: string;
  updatedData: Partial<Project>;
}

interface UseUpdateProjectMutationOptions {
  onSuccess?: (updatedProject: Project) => void;
  onError?: (error: unknown) => void;
}

// 프로젝트 수정
export const useUpdateProjectMutation = (options?: UseUpdateProjectMutationOptions) => {
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

      if (options?.onError) {
        if (isAxiosError(error)) options.onError(error);
        else console.error('AxiosError가 아닌 에러 발생', error);
      }
    },

    onSuccess: (updatedProject) => {
      queryClient.setQueryData(['project', 'me', updatedProject.id], updatedProject);
      queryClient.setQueryData<Project[]>(
        ['projects', 'me'],
        (old) => old?.map((p) => (p.id === updatedProject.id ? updatedProject : p)) ?? [],
      );
      options?.onSuccess?.(updatedProject);
    },

    onSettled: (_, __, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ['project', 'me', projectId] });
      queryClient.invalidateQueries({ queryKey: ['projects', 'me'] });
    },
  });
};
