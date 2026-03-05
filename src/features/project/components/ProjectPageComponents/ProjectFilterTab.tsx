import { BOARD_KEYS, BOARD } from '@/features/board/constants/board.domain.constants';
import type { Board } from '@/features/board/types/board.domain.types';
import FilterTab from '@/widgets/FilterTab';

interface ProjectFilterTabProps {
  value: Board;
  onChange: (value: Board) => void;
}

const ProjectFilterTab = ({ value, onChange }: ProjectFilterTabProps) => {
  const boardKey = value === BOARD.STATUS ? BOARD_KEYS.PROJECT_STATUS : BOARD_KEYS.PROJECT_MEMBER;
  let isShowSortDropdown = true;

  if (value === BOARD.MEMBER) isShowSortDropdown = false;

  return (
    <FilterTab
      boardKey={boardKey}
      value={value}
      onChange={onChange}
      showFilterToggle={true}
      showTagSearchInput={true}
      showSearchInput={true}
      showSortDropDown={isShowSortDropdown}
    />
  );
};

export default ProjectFilterTab;
