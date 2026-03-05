import type { SORT_BY, DIRECTION } from '@/features/board/constants/board.sort.constants';

export type SortBy = (typeof SORT_BY)[keyof typeof SORT_BY];
export type Direction = (typeof DIRECTION)[keyof typeof DIRECTION];

export interface SortState {
  sortBy: SortBy;
  direction: Direction;
  setSortBy: (newSortBy: SortBy) => void;
  toggleDirection: () => void;
  resetSort: () => void;
}
