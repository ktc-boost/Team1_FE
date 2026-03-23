import type { BOARD_KEYS, BOARD, PAGE } from '@/features/board/constants/board.domain.constants';
import type { TaskStatus, TaskListItem } from '@/features/task/types/task.domain.types';
import type { TaskQuery } from '@/features/task/types/task.query.types';

// 컬럼 데이터 타입
export type ColumnData = {
  status: TaskStatus;
  query: TaskQuery;
};

// 테스트 상태 보드용 컬럼 데이터 타입
export type TestColumnData = Omit<ColumnData, 'query'> & {
  query?: TaskQuery;
  tasks: TaskListItem[];
};

// 보드 키 타입
export type BoardKey = (typeof BOARD_KEYS)[keyof typeof BOARD_KEYS];

// 보드 타입
export type Board = (typeof BOARD)[keyof typeof BOARD];

// 페이지 타입
export type Page = (typeof PAGE)[keyof typeof PAGE];
