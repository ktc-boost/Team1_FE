import { useMutation, useQueryClient, type InfiniteData } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { taskApi } from '@/features/task/api/taskApi';
import type { TaskListItem, TaskListResponse } from '@/features/task/types/taskTypes';
import { TASK_QUERY_KEYS } from '@/features/task/constants/taskQueryKeys';
import type { CreateTaskInput } from '@/features/task/schemas/taskSchema';
import { useSortStore } from '@/features/board/store/useSortStore';
import { createTagObjects } from '@/features/tag/utils/tagUtils';
import type { Member } from '@/features/user/types/userTypes';
import { useBoardSearchStore } from '@/features/board/store/useBoardSearchStore';

const createTempTask = (
  taskData: CreateTaskInput,
  projectId: string,
  tempId: string,
): TaskListItem => {
  const assignees: Member[] = taskData.assignees.map((id) => ({ id, name: '' }));
  const tags = createTagObjects(taskData.tags || []);

  return {
    taskId: tempId,
    projectId,
    title: taskData.title,
    description: taskData.description || '',
    status: taskData.status,
    dueDate: taskData.dueDate,
    urgent: taskData.urgent ?? false,
    requiredReviewerCount: taskData.requiredReviewerCount ?? 0,
    commentCount: 0,
    fileCount: 0,
    tags,
    assignees,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

export const useCreateTaskMutation = (projectId: string) => {
  const queryClient = useQueryClient();
  const { sortBy, direction } = useSortStore();
  const searchMap = useBoardSearchStore((state) => state.searchMap);
  const activeSearch = Object.values(searchMap).find((s) => s) ?? '';

  return useMutation<
    TaskListItem,
    Error,
    CreateTaskInput,
    {
      previousData?: Map<readonly string[], InfiniteData<TaskListResponse> | undefined>;
      tempId?: string;
    }
  >({
    mutationFn: (taskData) => taskApi.createTask(projectId, taskData),

    onMutate: async (taskData) => {
      const projectKey = TASK_QUERY_KEYS.project(
        projectId,
        taskData.status,
        sortBy,
        direction,
        activeSearch,
      );
      const meKey = TASK_QUERY_KEYS.meStatus(taskData.status, sortBy, direction, activeSearch);
      const memberKeys = taskData.assignees.map((memberId) =>
        TASK_QUERY_KEYS.member(projectId, memberId, activeSearch),
      );

      await Promise.all([
        queryClient.cancelQueries({ queryKey: projectKey }),
        queryClient.cancelQueries({ queryKey: meKey }),
        ...memberKeys.map((key) => queryClient.cancelQueries({ queryKey: key })),
      ]);

      const previousData = new Map<readonly string[], InfiniteData<TaskListResponse> | undefined>();
      const getAndStore = (key: readonly string[]) => {
        previousData.set(key, queryClient.getQueryData<InfiniteData<TaskListResponse>>(key));
      };

      getAndStore(projectKey);
      getAndStore(meKey);
      memberKeys.forEach(getAndStore);

      const tempId = `temp-${uuidv4()}`;
      const tempTask = createTempTask(taskData, projectId, tempId);

      const updateCache = (oldData?: InfiniteData<TaskListResponse>) => {
        if (!oldData) {
          return {
            pageParams: [undefined],
            pages: [{ tasks: [tempTask], count: 1, nextCursor: undefined, hasNext: false }],
          };
        }
        return {
          ...oldData,
          pages: oldData.pages.map((page, idx) =>
            idx === 0 ? { ...page, tasks: [tempTask, ...page.tasks] } : page,
          ),
        };
      };

      queryClient.setQueryData(projectKey, updateCache);
      queryClient.setQueryData(meKey, updateCache);
      memberKeys.forEach((key) => queryClient.setQueryData(key, updateCache));

      return { previousData, tempId };
    },

    onError: (_, _taskData, context) => {
      context?.previousData?.forEach((data, key) => {
        queryClient.setQueryData(key, data);
      });
    },

    onSuccess: (createdTask, taskData, context) => {
      const projectKey = TASK_QUERY_KEYS.project(
        projectId,
        taskData.status,
        sortBy,
        direction,
        activeSearch,
      );
      const meKey = TASK_QUERY_KEYS.meStatus(taskData.status, sortBy, direction, activeSearch);
      const memberKeys = taskData.assignees.map((memberId) =>
        TASK_QUERY_KEYS.member(projectId, memberId, activeSearch),
      );

      const replaceTempTask = (oldData?: InfiniteData<TaskListResponse>) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            tasks: page.tasks.map((task) => (task.taskId === context?.tempId ? createdTask : task)),
          })),
        };
      };

      queryClient.setQueryData(projectKey, replaceTempTask);
      queryClient.setQueryData(meKey, replaceTempTask);
      memberKeys.forEach((key) => queryClient.setQueryData(key, replaceTempTask));

      queryClient.invalidateQueries({ queryKey: TASK_QUERY_KEYS.projectCountStatus(projectId) });
      queryClient.invalidateQueries({ queryKey: TASK_QUERY_KEYS.projectCountMember(projectId) });
      queryClient.invalidateQueries({ queryKey: TASK_QUERY_KEYS.meCountStatus() });
    },
  });
};
