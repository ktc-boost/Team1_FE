import { useAllProjectTasksQueries } from '@/features/task/hooks/query/useAllProjectTasksQueries';
import { useAllMyTasksQueries } from '@/features/task/hooks/query/useAllMyTasksQueries';
import { statusList, type ColumnData } from '@/features/board/types/boardTypes';
import { useSortStore } from '@/features/board/store/useSortStore';
import { useBoardSearchStore } from '@/features/board/store/useBoardSearchStore';
import { BOARD_KEYS } from '@/features/board/constants/boardConstants';

export const useStatusBoardQueries = (projectId?: string): ColumnData[] => {
  const isProjectBoard = !!projectId;
  const { sortBy, direction } = useSortStore();
  const searchMap = useBoardSearchStore((state) => state.searchMap);

  const search = isProjectBoard
    ? (searchMap[BOARD_KEYS.PROJECT_STATUS] ?? '')
    : (searchMap[BOARD_KEYS.MY_TASKS] ?? '');

  const projectQueries = useAllProjectTasksQueries(
    projectId ?? '',
    isProjectBoard,
    sortBy,
    direction,
    search,
  );
  const myTaskQueries = useAllMyTasksQueries(!isProjectBoard, sortBy, direction, search);
  const queries = isProjectBoard ? projectQueries : myTaskQueries;

  return statusList.map((status) => ({
    status,
    query: queries[status],
  }));
};
