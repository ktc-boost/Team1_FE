import type { TaskQuery } from '@/features/task/types/taskTypes';
import type { BOARD_KEYS } from '@/features/board/constants/boardConstants';

export const columnStatus = [
  { status: 'TODO', title: '진행 전' },
  { status: 'PROGRESS', title: '진행 중' },
  { status: 'REVIEW', title: '검토 중' },
  { status: 'DONE', title: '완료' },
] as const;

// Status 타입: 'TODO' | 'PROGRESS' | 'REVIEW' | 'DONE'
export type Status = (typeof columnStatus)[number]['status'];

// statusList: ['TODO', 'PROGRESS', 'REVIEW', 'DONE']
export const statusList: Status[] = columnStatus.map((c) => c.status);

// Member Board에서 사용하는 순서 배열 :  ['TODO','PROGRESS','REVIEW']
export const columnOrder = ['PROGRESS', 'REVIEW', 'TODO'];

export type ColumnData = {
  status: Status;
  query: TaskQuery;
};

export type BoardKey = (typeof BOARD_KEYS)[keyof typeof BOARD_KEYS];
export type BoardType = 'status' | 'member';
