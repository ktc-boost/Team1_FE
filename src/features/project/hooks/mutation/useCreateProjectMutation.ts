import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectApi } from '@/features/project/api/projectApi';
import type { Project } from '@/features/project/types/projectTypes';
import { v4 as uuidv4 } from 'uuid';
import { ROLES } from '@/features/project/constants/projectConstants';

// 프로젝트 생성
export const useCreateProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectName: string) => projectApi.createProject(projectName),

    onMutate: async (projectName: string) => {
      await queryClient.cancelQueries({ queryKey: ['projects', 'me'] });
      const previousProjects = queryClient.getQueryData<Project[]>(['projects', 'me']);

      const tempId = `temp-${uuidv4()}`;

      const newTempProject: Project = {
        id: tempId,
        name: projectName,
        defaultReviewerCount: 2,
        role: ROLES.MEMBER,
      };

      queryClient.setQueryData<Project[]>(['projects', 'me'], (old) => [
        ...(old ?? []),
        newTempProject,
      ]);

      return { previousProjects, tempId };
    },

    onSuccess: (createdProject, _, context) => {
      queryClient.setQueryData<Project[]>(['projects', 'me'], (old) =>
        old ? old.map((p) => (p.id === context?.tempId ? createdProject : p)) : [createdProject],
      );
    },

    onError: (error, __, context) => {
      console.error('프로젝트 생성 실패:', error);
      if (context?.previousProjects) {
        queryClient.setQueryData(['projects', 'me'], context.previousProjects);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['projects', 'me'] });
    },
  });
};
