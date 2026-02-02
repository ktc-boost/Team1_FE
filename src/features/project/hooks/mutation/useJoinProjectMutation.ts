import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { projectMembershipApi } from '@/features/project/api/projectMembershipApi';
import type { Project } from '@/features/project/types/projectTypes';
import { PROJECT_QUERY_KEYS } from '@/features/project/constants/projectQueryKeys';

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
      await queryClient.cancelQueries({ queryKey: PROJECT_QUERY_KEYS.myProjects() });
      const previousProjects = queryClient.getQueryData<Project[]>(PROJECT_QUERY_KEYS.myProjects());
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

      queryClient.setQueryData<Project[]>(PROJECT_QUERY_KEYS.myProjects(), (old) =>
        old ? [...old, project] : [project],
      );

      options?.onSuccess?.(project);
    },

    onError: (error, _variables, context) => {
      if (context?.previousProjects) {
        queryClient.setQueryData(PROJECT_QUERY_KEYS.myProjects(), context.previousProjects);
      }

      if (isAxiosError(error)) options?.onError?.({ type: error.response?.data?.type });
      else options?.onError?.({});
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_QUERY_KEYS.myProjects() });
    },
  });
};
