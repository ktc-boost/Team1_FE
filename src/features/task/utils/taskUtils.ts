import type { TaskStatusMeta } from '@/features/task/types/task.domain.types';
import type { TaskListItem, TaskDetail } from '@/features/task/types/task.domain.types';
import type {
  TaskCountByStatusMap,
  ProjectTaskCountByMemberMap,
} from '@/features/task/types/task.ui.types';
import { TASK_STATUS } from '@/features/task/constants/task.domain.constants';

export const getTaskCountByStatus = (
  columnStatus: TaskStatusMeta['status'],
  taskCountList?: TaskCountByStatusMap,
) => {
  if (!taskCountList) return 0;

  switch (columnStatus) {
    case TASK_STATUS.TODO:
      return taskCountList.todo;
    case TASK_STATUS.PROGRESS:
      return taskCountList.progress;
    case TASK_STATUS.REVIEW:
      return taskCountList.review;
    case TASK_STATUS.DONE:
      return taskCountList.done;
    default:
      return 0;
  }
};

export const getTaskCountByMember = (
  columnStatus: TaskStatusMeta['status'],
  taskCountList?: ProjectTaskCountByMemberMap,
): number => {
  if (!taskCountList) return 0;

  switch (columnStatus) {
    case TASK_STATUS.TODO:
      return taskCountList.todo;
    case TASK_STATUS.PROGRESS:
      return taskCountList.progress;
    case TASK_STATUS.REVIEW:
      return taskCountList.review;
    default:
      return 0;
  }
};

export const mapTaskListItemToDetail = (task: TaskListItem): TaskDetail => {
  return {
    id: task.taskId,
    title: task.title,
    description: task.description,
    status: task.status,
    dueDate: task.dueDate,
    urgent: task.urgent,
    requiredReviewerCount: task.requiredReviewerCount,
    tags: task.tags,
    assignees: task.assignees,
    approvedCount: 0,
    reReviewRequestedAt: '',
    comments: [],
    files: [],
    approvedByMe: false,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  };
};
