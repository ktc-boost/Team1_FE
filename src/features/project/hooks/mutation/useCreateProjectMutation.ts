import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectApi } from '@/features/project/api/projectApi';
import type { Project } from '@/features/project/types/projectTypes';
import { v4 as uuidv4 } from 'uuid';
import { ROLES } from '@/features/project/constants/projectConstants';
import { PROJECT_QUERY_KEYS } from '@/features/project/constants/projectQueryKeys';

// 프로젝트 생성
export const useCreateProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectName: string) => projectApi.createProject(projectName),

    onMutate: async (projectName: string) => {
      await queryClient.cancelQueries({ queryKey: PROJECT_QUERY_KEYS.myProjects() });
      const previousProjects = queryClient.getQueryData<Project[]>(PROJECT_QUERY_KEYS.myProjects());

      const tempId = `temp-${uuidv4()}`;

      const newTempProject: Project = {
        id: tempId,
        name: projectName,
        defaultReviewerCount: 2,
        role: ROLES.MEMBER,
      };

      queryClient.setQueryData<Project[]>(PROJECT_QUERY_KEYS.myProjects(), (old) => [
        ...(old ?? []),
        newTempProject,
      ]);

      return { previousProjects, tempId };
    },

    onSuccess: (createdProject, _, context) => {
      queryClient.setQueryData<Project[]>(PROJECT_QUERY_KEYS.myProjects(), (old) =>
        old ? old.map((p) => (p.id === context?.tempId ? createdProject : p)) : [createdProject],
      );
    },

    onError: (error, __, context) => {
      console.error('프로젝트 생성 실패:', error);
      if (context?.previousProjects) {
        queryClient.setQueryData(PROJECT_QUERY_KEYS.myProjects(), context.previousProjects);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_QUERY_KEYS.myProjects() });
    },
  });
};
