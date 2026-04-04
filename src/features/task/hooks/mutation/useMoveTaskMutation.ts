import { useMutation, useQueryClient, type InfiniteData } from '@tanstack/react-query';
import { taskApi } from '@/features/task/api/taskApi';
import { arrayMove } from '@dnd-kit/sortable';
import type { TaskListResponse } from '@/features/task/types/task.query.types';
import type { TaskListItem, TaskDetail, TaskStatus } from '@/features/task/types/task.domain.types';
import { TASK_QUERY_KEYS } from '@/features/task/constants/task.query.constants';
import type { Direction, SortBy } from '@/features/board/types/board.sort.types';
import { useBoardSearchStore } from '@/features/board/store/useBoardSearchStore';
import { BOARD_KEYS } from '@/features/board/constants/board.domain.constants';

export type MoveTaskParams = {
  projectId: string;
  activeTaskId: string;
  fromStatus: TaskStatus;
  toStatus: TaskStatus;
  overId?: string;
  queryIdentifier: string;
  sortBy: SortBy;
  direction: Direction;
  activeTask: TaskListItem;
};

const updateTaskStatus = (task: TaskListItem, toStatus: TaskStatus): TaskListItem => ({
  ...task,
  status: toStatus,
});

const getQueryKey = (status: TaskStatus, variables: MoveTaskParams) => {
  const searchMap = useBoardSearchStore.getState().searchMap;
  const search =
    variables.queryIdentifier === 'me'
      ? searchMap[BOARD_KEYS.MY_TASKS]
      : searchMap[BOARD_KEYS.PROJECT_STATUS];

  return variables.queryIdentifier === 'me'
    ? TASK_QUERY_KEYS.meStatus(status, variables.sortBy, variables.direction, search)
    : TASK_QUERY_KEYS.project(
        variables.projectId,
        status,
        variables.sortBy,
        variables.direction,
        search,
      );
};

export const optimisticallyMoveTask = (
  queryClient: ReturnType<typeof useQueryClient>,
  variables: MoveTaskParams,
) => {
  const searchMap = useBoardSearchStore.getState().searchMap;

  const {
    activeTaskId,
    fromStatus,
    toStatus,
    overId,
    queryIdentifier,
    projectId,
    sortBy,
    direction,
    activeTask,
  } = variables;

  const search =
    queryIdentifier === 'me'
      ? searchMap[BOARD_KEYS.MY_TASKS]
      : searchMap[BOARD_KEYS.PROJECT_STATUS];

  const getQueryKeyLocal = (status: TaskStatus) =>
    queryIdentifier === 'me'
      ? TASK_QUERY_KEYS.meStatus(status, sortBy, direction, search)
      : TASK_QUERY_KEYS.project(projectId, status, sortBy, direction, search);

  const fromKey = getQueryKeyLocal(fromStatus);
  const toKey = getQueryKeyLocal(toStatus);

  const previousFrom = queryClient.getQueryData<InfiniteData<TaskListResponse>>(fromKey);
  const previousTo = queryClient.getQueryData<InfiniteData<TaskListResponse>>(toKey);

  if (fromStatus === toStatus && previousFrom) {
    queryClient.setQueryData<InfiniteData<TaskListResponse>>(fromKey, (old) => {
      if (!old) return old;
      const pages = old.pages.map((page) => {
        const tasks = page.tasks.slice();
        if (overId) {
          const activeIndex = tasks.findIndex((t) => t.taskId === activeTaskId);
          const overIndex = tasks.findIndex((t) => t.taskId === overId);
          return { ...page, tasks: arrayMove(tasks, activeIndex, overIndex) };
        }
        return page;
      });
      return { ...old, pages };
    });
  }

  if (fromStatus !== toStatus) {
    if (previousFrom) {
      queryClient.setQueryData<InfiniteData<TaskListResponse>>(fromKey, (old) => {
        if (!old) return old;
        const pages = old.pages.map((page) => ({
          ...page,
          tasks: page.tasks.filter((t) => t.taskId !== activeTaskId),
        }));
        return { ...old, pages };
      });
    }

    const movedTask = updateTaskStatus(activeTask, toStatus);
    queryClient.setQueryData<InfiniteData<TaskListResponse>>(toKey, (old) => {
      if (!old) {
        return {
          pageParams: [undefined],
          pages: [{ tasks: [movedTask], count: 1, nextCursor: undefined, hasNext: false }],
        };
      }
      const pages = old.pages.map((page, index) =>
        index === 0 ? { ...page, tasks: [movedTask, ...page.tasks] } : page,
      );
      return { ...old, pages };
    });
  }

  const taskDetailKey = TASK_QUERY_KEYS.detail(projectId, activeTaskId);
  queryClient.setQueryData<TaskDetail>(taskDetailKey, (old) => {
    if (!old) return old;
    return { ...old, status: toStatus };
  });

  return {
    previousFrom,
    previousTo,
    previousTaskDetail: queryClient.getQueryData<TaskDetail>(taskDetailKey),
  };
};

export const useMoveTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, activeTaskId, toStatus }: MoveTaskParams) =>
      taskApi.updateTaskStatus(projectId, activeTaskId, toStatus),

    onMutate: async (variables) => {
      const fromKey = getQueryKey(variables.fromStatus, variables);
      const toKey = getQueryKey(variables.toStatus, variables);

      await queryClient.cancelQueries({ queryKey: fromKey });
      await queryClient.cancelQueries({ queryKey: toKey });

      return optimisticallyMoveTask(queryClient, variables);
    },

    onError: (_, variables, context) => {
      const { fromStatus, toStatus, projectId, activeTaskId } = variables;

      const getQueryKeyLocal = (status: TaskStatus) => getQueryKey(status, variables);

      if (context?.previousFrom)
        queryClient.setQueryData(getQueryKeyLocal(fromStatus), context.previousFrom);
      if (context?.previousTo)
        queryClient.setQueryData(getQueryKeyLocal(toStatus), context.previousTo);

      if (context?.previousTaskDetail)
        queryClient.setQueryData(
          TASK_QUERY_KEYS.detail(projectId, activeTaskId),
          context.previousTaskDetail,
        );
    },

    onSettled: (_data, _error, variables) => {
      const getQueryKeyLocal = (status: TaskStatus) => getQueryKey(status, variables);

      queryClient.invalidateQueries({ queryKey: getQueryKeyLocal(variables.fromStatus) });
      queryClient.invalidateQueries({ queryKey: getQueryKeyLocal(variables.toStatus) });
      queryClient.invalidateQueries({
        queryKey: TASK_QUERY_KEYS.detail(variables.projectId, variables.activeTaskId),
      });
      queryClient.invalidateQueries({
        queryKey: TASK_QUERY_KEYS.projectCountStatus(variables.projectId),
      });
      queryClient.invalidateQueries({
        queryKey: TASK_QUERY_KEYS.projectCountMember(variables.projectId),
      });
      queryClient.invalidateQueries({ queryKey: TASK_QUERY_KEYS.meCountStatus() });
    },
  });
};
