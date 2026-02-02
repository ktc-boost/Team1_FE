import { isAxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectApi } from '@/features/project/api/projectApi';
import type { Project } from '@/features/project/types/projectTypes';
import { PROJECT_QUERY_KEYS } from '@/features/project/constants/projectQueryKeys';

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
      await queryClient.cancelQueries({ queryKey: PROJECT_QUERY_KEYS.myProjects() });
      const previousProjects = queryClient.getQueryData<Project[]>(PROJECT_QUERY_KEYS.myProjects());

      queryClient.setQueryData<Project[]>(
        PROJECT_QUERY_KEYS.myProjects(),
        (old) => old?.map((p) => (p.id === projectId ? { ...p, ...updatedData } : p)) ?? [],
      );
      return { previousProjects };
    },

    onError: (error, __, context) => {
      console.error('프로젝트 수정 실패:', error);
      if (context?.previousProjects) {
        queryClient.setQueryData(PROJECT_QUERY_KEYS.myProjects(), context.previousProjects);
      }

      if (options?.onError) {
        if (isAxiosError(error)) options.onError(error);
        else console.error('AxiosError가 아닌 에러 발생', error);
      }
    },

    onSuccess: (updatedProject) => {
      queryClient.setQueryData(PROJECT_QUERY_KEYS.detail(updatedProject.id), updatedProject);
      queryClient.setQueryData<Project[]>(
        PROJECT_QUERY_KEYS.myProjects(),
        (old) => old?.map((p) => (p.id === updatedProject.id ? updatedProject : p)) ?? [],
      );
      options?.onSuccess?.(updatedProject);
    },

    onSettled: (_, __, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: PROJECT_QUERY_KEYS.detail(projectId) });
      queryClient.invalidateQueries({ queryKey: PROJECT_QUERY_KEYS.myProjects() });
    },
  });
};
