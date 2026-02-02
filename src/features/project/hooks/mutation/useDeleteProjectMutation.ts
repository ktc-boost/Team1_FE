import { isAxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectApi } from '@/features/project/api/projectApi';
import type { Project } from '@/features/project/types/projectTypes';
import { PROJECT_QUERY_KEYS } from '@/features/project/constants/projectQueryKeys';

interface UseDeleteProjectMutationOptions {
  onSuccess?: (projectId: string) => void;
  onError?: (error: unknown) => void;
}

// 프로젝트 삭제
export const useDeleteProjectMutation = (options?: UseDeleteProjectMutationOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: string) => projectApi.deleteProject(projectId),

    onMutate: async (projectId: string) => {
      await queryClient.cancelQueries({ queryKey: PROJECT_QUERY_KEYS.myProjects() });
      const previousProjects = queryClient.getQueryData<Project[]>(PROJECT_QUERY_KEYS.myProjects());

      queryClient.setQueryData<Project[]>(
        PROJECT_QUERY_KEYS.myProjects(),
        (old) => old?.filter((p) => p.id !== projectId) ?? [],
      );

      return { previousProjects };
    },

    onError: (error, __, context) => {
      console.error('프로젝트 삭제 실패:', error);
      if (context?.previousProjects) {
        queryClient.setQueryData(PROJECT_QUERY_KEYS.myProjects(), context.previousProjects);
      }

      if (options?.onError) {
        if (isAxiosError(error)) options.onError(error);
        else console.error('AxiosError가 아닌 에러 발생', error);
      }
    },

    onSuccess: (_, projectId) => {
      queryClient.removeQueries({ queryKey: PROJECT_QUERY_KEYS.detail(projectId) });
      options?.onSuccess?.(projectId);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_QUERY_KEYS.myProjects() });
    },
  });
};
