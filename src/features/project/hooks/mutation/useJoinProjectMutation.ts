import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectMembershipApi } from '@/features/project/api/projectMembershipApi';
import type { Project } from '@/features/project/types/projectTypes';
import { PROJECT_QUERY_KEYS } from '@/features/project/constants/projectQueryKeys';
import { ApiError } from '@/shared/error/types/apiError.types';

interface UseJoinProjectMutationOptions {
  onSuccess?: (project: Project) => void;
  onError?: (error: ApiError) => void;
}

// 프로젝트 참여
export const useJoinProjectMutation = (options?: UseJoinProjectMutationOptions) => {
  const queryClient = useQueryClient();

  type JoinProjectResponse = Awaited<ReturnType<typeof projectMembershipApi.joinProject>>;
  type JoinProjectContext = { previousProjects?: Project[] };

  return useMutation<JoinProjectResponse, ApiError, string, JoinProjectContext>({
    mutationFn: (joinCode) => projectMembershipApi.joinProject(joinCode),

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
      window.gtag?.('event', 'join_project', {
        project_id: joinedProject.projectId,
        role: joinedProject.role,
      });
      options?.onSuccess?.(project);
    },

    onError: (error, _variables, context) => {
      if (context?.previousProjects) {
        queryClient.setQueryData(PROJECT_QUERY_KEYS.myProjects(), context.previousProjects);
      }

      options?.onError?.(error);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_QUERY_KEYS.myProjects() });
    },
  });
};
