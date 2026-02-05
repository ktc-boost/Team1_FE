import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskApi } from '@/features/task/api/taskApi';
import toast from 'react-hot-toast';
import type { TaskApproveResponse, TaskDetail } from '@/features/task/types/taskTypes';
import { TASK_QUERY_KEYS } from '@/features/task/constants/taskQueryKeys';

// 할 일 승인
export const useApproveTaskMutation = (projectId: string, taskId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (): Promise<TaskApproveResponse> => taskApi.approveTask(projectId, taskId),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: TASK_QUERY_KEYS.detail(projectId, taskId) });

      const previousTask = queryClient.getQueryData<TaskDetail>(
        TASK_QUERY_KEYS.detail(projectId, taskId),
      );

      queryClient.setQueryData<TaskDetail>(TASK_QUERY_KEYS.detail(projectId, taskId), (old) =>
        old
          ? {
              ...old,
              approvedCount: old.approvedCount + 1,
            }
          : old,
      );

      return { previousTask };
    },

    onError: (_, __, context) => {
      if (context?.previousTask) {
        queryClient.setQueryData(TASK_QUERY_KEYS.detail(projectId, taskId), context.previousTask);
      }
      toast.error('승인 중 오류가 발생했습니다.', { position: 'top-center' });
    },

    onSuccess: (updated) => {
      queryClient.setQueryData<TaskDetail>(TASK_QUERY_KEYS.detail(projectId, taskId), (old) =>
        old ? { ...old, approvedCount: updated.approvedCount } : old,
      );
      toast.success('승인이 완료되었어요!', { position: 'top-center' });
    },
  });
};
