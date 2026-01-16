import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskApi } from '@/features/task/api/taskApi';
import { TASK_QUERY_KEYS } from '@/features/task/constants/taskQueryKeys';
import toast from 'react-hot-toast';
import { useSortStore } from '@/features/board/store/useSortStore';
import type { TaskDetail } from '@/features/task/types/taskTypes';

// 할 일 상태 업데이트
export const useUpdateTaskStatusMutation = () => {
  const queryClient = useQueryClient();
  const { sortBy, direction } = useSortStore();

  return useMutation({
    mutationFn: ({
      projectId,
      taskId,
      status,
    }: {
      projectId: string;
      taskId: string;
      status: string;
    }) => taskApi.updateTaskStatus(projectId, taskId, status),

    onMutate: async ({ projectId, taskId, status }) => {
      await queryClient.cancelQueries({ queryKey: TASK_QUERY_KEYS.detail(projectId, taskId) });

      const previousTask = queryClient.getQueryData<TaskDetail>(
        TASK_QUERY_KEYS.detail(projectId, taskId),
      );

      queryClient.setQueryData<TaskDetail>(TASK_QUERY_KEYS.detail(projectId, taskId), (old) =>
        old ? { ...old, status } : old,
      );

      return { previousTask };
    },

    onError: (_, variables, context) => {
      if (context?.previousTask) {
        queryClient.setQueryData(
          TASK_QUERY_KEYS.detail(variables.projectId, variables.taskId),
          context.previousTask,
        );
      }
      toast.error('상태 변경 중 오류가 발생했습니다.');
    },

    onSettled: (_, __, variables) => {
      const { projectId, status } = variables;

      queryClient.invalidateQueries({
        queryKey: TASK_QUERY_KEYS.project(projectId, status, sortBy, direction),
      });
      queryClient.invalidateQueries({
        queryKey: TASK_QUERY_KEYS.projectCountStatus(projectId),
      });
    },
  });
};
