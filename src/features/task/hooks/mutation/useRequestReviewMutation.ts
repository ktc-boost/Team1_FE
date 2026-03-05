import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { taskApi } from '@/features/task/api/taskApi';
import { TASK_QUERY_KEYS } from '@/features/task/constants/task.query.constants';
import type { TaskDetail } from '@/features/task/types/task.domain.types';
import { TASK_STATUS } from '@/features/task/constants/task.domain.constants';

// 할 일 리뷰 재요청
export const useRequestReviewMutation = (projectId: string, taskId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => taskApi.requestReviewTask(projectId, taskId),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: TASK_QUERY_KEYS.detail(projectId, taskId) });

      const previousTask = queryClient.getQueryData<TaskDetail>(
        TASK_QUERY_KEYS.detail(projectId, taskId),
      );

      queryClient.setQueryData<TaskDetail>(TASK_QUERY_KEYS.detail(projectId, taskId), (old) =>
        old
          ? {
              ...old,
              status: TASK_STATUS.REVIEW,
              reReviewRequestedAt: new Date().toISOString(),
            }
          : old,
      );

      return { previousTask };
    },

    onError: (_, __, context) => {
      if (context?.previousTask) {
        queryClient.setQueryData(TASK_QUERY_KEYS.detail(projectId, taskId), context.previousTask);
      }
    },

    onSuccess: (updatedTask) => {
      queryClient.setQueryData(TASK_QUERY_KEYS.detail(projectId, taskId), updatedTask);
      toast.success('검토 요청을 다시 보냈어요!', { position: 'top-center' });
    },
  });
};
