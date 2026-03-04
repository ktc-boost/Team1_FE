import type { BOARD_KEYS, BOARD, PAGE } from '@/features/board/constants/board.domain.constants';
import type { TaskStatus } from '@/features/task/types/task.domain.types';
import type { TaskQuery } from '@/features/task/types/task.query.types';

// 컬럼 데이터 타입
export type ColumnData = {
  status: TaskStatus;
  query: TaskQuery;
};

// 보드 키 타입
export type BoardKey = (typeof BOARD_KEYS)[keyof typeof BOARD_KEYS];

// 보드 타입
export type Board = (typeof BOARD)[keyof typeof BOARD];

// 페이지 타입
export type Page = (typeof PAGE)[keyof typeof PAGE];
