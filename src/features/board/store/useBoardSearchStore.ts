import { create } from 'zustand';
import { BOARD_KEYS } from '@/features/board/constants/boardConstants';
import type { BoardKey } from '@/features/board/types/boardTypes';

interface BoardSearchState {
  searchMap: Record<BoardKey, string>;
  setSearch: (boardKey: BoardKey, value: string) => void;
  resetSearch: () => void;
}

export const useBoardSearchStore = create<BoardSearchState>((set) => ({
  searchMap: {
    [BOARD_KEYS.MY_TASKS]: '',
    [BOARD_KEYS.PROJECT_STATUS]: '',
    [BOARD_KEYS.PROJECT_MEMBER]: '',
  },

  setSearch: (boardKey, value) =>
    set((state) => ({
      searchMap: { ...state.searchMap, [boardKey]: value },
    })),

  resetSearch: () =>
    set({
      searchMap: {
        [BOARD_KEYS.MY_TASKS]: '',
        [BOARD_KEYS.PROJECT_STATUS]: '',
        [BOARD_KEYS.PROJECT_MEMBER]: '',
      },
    }),
}));
