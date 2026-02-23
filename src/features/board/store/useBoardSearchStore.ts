import { create } from 'zustand';
import { BOARD_KEYS } from '@/features/board/constants/board.domain.constants';
import type { BoardKey } from '@/features/board/types/board.domain.types';

interface BoardSearchState {
  searchMap: Record<BoardKey, string>;
  setSearch: (boardKey: BoardKey, value: string) => void;
  clearOtherBoardSearch: (currentBoardKey: BoardKey) => void;
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

  clearOtherBoardSearch: (currentBoardKey) =>
    set((state) => {
      const newMap: Record<BoardKey, string> = { ...state.searchMap };
      Object.keys(newMap).forEach((key) => {
        if (key !== currentBoardKey) newMap[key as BoardKey] = '';
      });
      return { searchMap: newMap };
    }),
}));
