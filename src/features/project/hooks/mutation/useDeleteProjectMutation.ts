import { isAxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectApi } from '@/features/project/api/projectApi';
import type { Project } from '@/features/project/types/projectTypes';

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

      if (options?.onError) {
        if (isAxiosError(error)) options.onError(error);
        else console.error('AxiosError가 아닌 에러 발생', error);
      }
    },

    onSuccess: (_, projectId) => {
      queryClient.removeQueries({ queryKey: ['project', 'me', projectId] });
      options?.onSuccess?.(projectId);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['projects', 'me'] });
    },
  });
};
