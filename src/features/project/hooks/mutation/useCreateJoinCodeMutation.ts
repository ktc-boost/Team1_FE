import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectMembershipApi } from '@/features/project/api/projectMembershipApi';
import type { JoinCodeResponse } from '@/features/project/types/projectTypes';
import { PROJECT_QUERY_KEYS } from '@/features/project/constants/projectQueryKeys';

export const useCreateJoinCodeMutation = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation<JoinCodeResponse, Error, void>({
    mutationFn: () => {
      return projectMembershipApi.createJoinCode(projectId);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        PROJECT_QUERY_KEYS.joinCode(projectId),
        (prev: JoinCodeResponse) => ({
          ...(prev ?? {}),
          joinCode: data.joinCode,
          expiresAt: data.expiresAt,
        }),
      );
    },
    onError: (error) => {
      console.error('참여 코드 생성 실패:', error);
    },
  });
};
