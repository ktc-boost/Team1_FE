import type {
  TASK_STATUS_LIST,
  TASK_STATUS_META,
} from '@/features/task/constants/task.domain.constants';
import type { TagList } from '@/features/tag/types/tagTypes';
import type { Member } from '@/features/user/types/userTypes';
import type { ServerFileType } from '@/features/task-detail/types/fileApiTypes';

// 'TODO' | 'PROGRESS' | 'REVIEW' | 'DONE'
export type TaskStatus = (typeof TASK_STATUS_LIST)[number];

// { status: TaskStatus; title: string } 형태의 할 일 상태 메타 타입
export type TaskStatusMeta = (typeof TASK_STATUS_META)[number];

// 할 일 목록 조회 아이템
export type TaskListItem = {
  taskId: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  urgent: boolean;
  requiredReviewerCount: number;
  fileCount: number;
  commentCount: number;
  tags: TagList;
  assignees: Member[];
  createdAt: string;
  updatedAt: string;
};

// 할 일 상세 정보 (TaskItem + 추가 정보, Response와 형태 동일)
export type TaskDetail = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  urgent: boolean;
  approvedCount: number;
  requiredReviewerCount: number;
  reReviewRequestedAt: string;
  approvedByMe: boolean;
  tags: TagList;
  assignees: Member[];
  comments: Comment[];
  files: ServerFileType[];
  createdAt: string;
  updatedAt: string;
};
