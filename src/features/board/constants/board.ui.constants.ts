import { TASK_STATUS_META } from '@/features/task/constants/task.domain.constants';

/* Task 상태 목록 (UI 기준) */
export const COLUMN_STATUS_LIST = TASK_STATUS_META.map((c) => c.status);

/* Member Board에서 사용하는 스크롤 threshold 상수 */
export const COLLAPSIBLE_SCROLL_THRESHOLD = 100;
