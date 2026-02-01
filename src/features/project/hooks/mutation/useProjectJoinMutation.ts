import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectMembershipApi } from '@/features/project/api/projectMembershipApi';
import type { Project } from '@/features/project/types/projectTypes';
import { useNavigate } from 'react-router-dom';

type JoinProjectContext = {
  previousProjects?: Project[];
};

// 프로젝트 참여
export const useJoinProjectMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (joinCode: string) => projectMembershipApi.joinProject(joinCode),

    onMutate: async (): Promise<JoinProjectContext> => {
      await queryClient.cancelQueries({ queryKey: ['projects', 'me'] });
      const previousProjects = queryClient.getQueryData<Project[]>(['projects', 'me']);
      return { previousProjects };
    },

    onSuccess: (joinedProject) => {
      if (!joinedProject.projectId) {
        console.error('프로젝트 ID가 없습니다.');
        throw new Error('프로젝트 ID가 응답에 포함되지 않았습니다.');
      }
      const project: Project = {
        id: joinedProject.projectId,
        name: joinedProject.name || '',
        defaultReviewerCount: joinedProject.defaultReviewerCount ?? 0,
        role: joinedProject.role,
      };

      queryClient.setQueryData<Project[]>(['projects', 'me'], (old) =>
        old ? [...old, project] : [project],
      );

      navigate(`/project/${project.id}/board`);
    },

    onError: (_error, _variables, context) => {
      if (context?.previousProjects) {
        queryClient.setQueryData(['projects', 'me'], context.previousProjects);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['projects', 'me'] });
    },
  });
};
