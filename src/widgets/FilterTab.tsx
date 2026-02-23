import FilterToggle from '@/shared/components/ui/FilterToggle';
import SortDropDown from '@/shared/components/ui/SortDropDown';
import SearchInput from '@/features/search/components/TaskSearchInput';
import TagSearchInput from '@/features/search/components/TagSearchInput';
import type { BoardKey, Board } from '@/features/board/types/board.domain.types';
import SearchButtons from '@/features/search/components/SearchButtons';

interface FilterTabProps {
  boardKey: BoardKey;
  value?: Board;
  onChange?: (value: Board) => void;
  showFilterToggle?: boolean;
  showTagSearchInput?: boolean;
  showSearchInput?: boolean;
  showSortDropDown?: boolean;
}

const FilterTab = ({
  boardKey,
  value,
  onChange,
  showFilterToggle = true,
  showTagSearchInput = true,
  showSearchInput = true,
  showSortDropDown = true,
}: FilterTabProps) => {
  const hasTitleSearch = showSearchInput;
  const hasTagSearch = showTagSearchInput;
  const hasBothSearch = hasTitleSearch && hasTagSearch;

  return (
    <>
      <div className="hidden lg:flex items-center justify-between gap-4 p-2 px-4">
        <div className="flex gap-4">
          {showSearchInput && <SearchInput boardKey={boardKey} />}
          {showTagSearchInput && <TagSearchInput />}
        </div>

        <div className="flex gap-4">
          {showSortDropDown && <SortDropDown />}
          {showFilterToggle && value !== undefined && onChange && (
            <FilterToggle value={value} onChange={onChange} />
          )}
        </div>
      </div>

      <div className="flex items-center justify-between p-2 px-4 lg:hidden">
        {hasBothSearch && <SearchButtons boardKey={boardKey} />}
        {!hasBothSearch && hasTitleSearch && <SearchInput boardKey={boardKey} />}

        <div className="flex gap-2">
          {showSortDropDown && <SortDropDown />}
          {showFilterToggle && value !== undefined && onChange && (
            <FilterToggle value={value} onChange={onChange} />
          )}
        </div>
      </div>
    </>
  );
};

export default FilterTab;
