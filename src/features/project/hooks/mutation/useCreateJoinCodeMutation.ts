import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectMembershipApi } from '@/features/project/api/projectMembershipApi';
import type { JoinCodeResponse } from '@/features/project/types/projectTypes';

export const useCreateJoinCodeMutation = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation<JoinCodeResponse, Error, void>({
    mutationFn: () => {
      return projectMembershipApi.createJoinCode(projectId);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['joinCode', projectId], (prev) => ({
        ...(prev ?? {}),
        joinCode: data.joinCode,
        expiresAt: data.expiresAt,
      }));
    },
    onError: (error) => {
      console.error('참여 코드 생성 실패:', error);
    },
  });
};
