import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskApi } from '@/features/task/api/taskApi';
import type { TaskListItem, TaskDetail } from '@/features/task/types/taskTypes';
import { TASK_QUERY_KEYS } from '@/features/task/constants/taskQueryKeys';
import type { UpdateTaskInput } from '@/features/task/schemas/taskSchema';
import { mapTaskListItemToDetail } from '@/features/task/utils/taskUtils';

export const useUpdateTaskMutation = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    TaskListItem,
    Error,
    { taskId: string; taskData: UpdateTaskInput },
    { previousTask?: TaskDetail }
  >({
    mutationFn: ({ taskId, taskData }) => taskApi.updateTask(projectId, taskId, taskData),

    onMutate: ({ taskId, taskData }) => {
      const previousTask = queryClient.getQueryData<TaskDetail>(
        TASK_QUERY_KEYS.detail(projectId, taskId),
      );

      if (previousTask) {
        queryClient.setQueryData(TASK_QUERY_KEYS.detail(projectId, taskId), {
          ...previousTask,
          ...taskData,
          assignees: previousTask.assignees,
          tags: previousTask.tags,
          updatedAt: new Date().toISOString(),
          id: previousTask.id,
          comments: previousTask.comments,
          files: previousTask.files,
          approvedCount: previousTask.approvedCount,
        });
      }

      return { previousTask };
    },

    onError: (_, variables, context) => {
      if (context?.previousTask) {
        queryClient.setQueryData(
          TASK_QUERY_KEYS.detail(projectId, variables.taskId),
          context.previousTask,
        );
      }
      toast.error('할 일 수정에 실패했습니다.');
    },

    onSuccess: (updatedTask) => {
      queryClient.setQueryData(
        TASK_QUERY_KEYS.detail(projectId, updatedTask.taskId),
        (oldData: TaskDetail) => {
          if (oldData) {
            return {
              ...oldData,
              ...updatedTask,
              id: updatedTask.taskId,
            };
          }
          return mapTaskListItemToDetail(updatedTask);
        },
      );
    },
  });
};
