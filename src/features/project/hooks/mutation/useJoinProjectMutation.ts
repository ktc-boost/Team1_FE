import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { projectMembershipApi } from '@/features/project/api/projectMembershipApi';
import type { Project } from '@/features/project/types/projectTypes';

interface JoinProjectError {
  type?: string;
}

interface UseJoinProjectMutationOptions {
  onSuccess?: (project: Project) => void;
  onError?: (error: JoinProjectError) => void;
}

// 프로젝트 참여
export const useJoinProjectMutation = (options?: UseJoinProjectMutationOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (joinCode: string) => projectMembershipApi.joinProject(joinCode),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['projects', 'me'] });
      const previousProjects = queryClient.getQueryData<Project[]>(['projects', 'me']);
      return { previousProjects };
    },

    onSuccess: (joinedProject) => {
      if (!joinedProject.projectId) {
        throw new Error('프로젝트 ID가 응답에 없습니다.');
      }

      const project: Project = {
        id: joinedProject.projectId,
        name: joinedProject.name ?? '',
        defaultReviewerCount: joinedProject.defaultReviewerCount ?? 0,
        role: joinedProject.role,
      };

      queryClient.setQueryData<Project[]>(['projects', 'me'], (old) =>
        old ? [...old, project] : [project],
      );

      options?.onSuccess?.(project);
    },

    onError: (error, _variables, context) => {
      if (context?.previousProjects) {
        queryClient.setQueryData(['projects', 'me'], context.previousProjects);
      }

      if (isAxiosError(error)) options?.onError?.({ type: error.response?.data?.type });
      else options?.onError?.({});
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['projects', 'me'] });
    },
  });
};
