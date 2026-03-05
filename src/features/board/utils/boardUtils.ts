import type { TaskStatus } from '@/features/task/types/task.domain.types';
import { TASK_STATUS_META } from '@/features/task/constants/task.domain.constants';

export const getTitleByStatus = (status: TaskStatus) => {
  const column = TASK_STATUS_META.find((c) => c.status === status);
  return column?.title ?? '';
};
