import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/shared/components/shadcn/input';
import { useDebounce } from '@/shared/hooks/useDebounce';
import type { BoardKey } from '@/features/board/types/boardTypes';
import { useBoardSearchStore } from '@/features/board/store/useBoardSearchStore';

interface SearchInputProps {
  boardKey: BoardKey;
}

const TaskSearchInput = ({ boardKey }: SearchInputProps) => {
  const setSearch = useBoardSearchStore((state) => state.setSearch);
  const clearOtherBoardSearch = useBoardSearchStore((state) => state.clearOtherBoardSearch);

  const [localValue, setLocalValue] = useState('');
  const debouncedValue = useDebounce(localValue, 300);

  useEffect(() => {
    clearOtherBoardSearch(boardKey);
    setSearch(boardKey, debouncedValue);
  }, [debouncedValue, boardKey, setSearch, clearOtherBoardSearch]);

  return (
    <div className="relative w-[300px]">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <Input
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder="검색어를 입력하세요"
        className="w-full h-9 sm:h-10 px-3 pl-10 rounded-lg border-gray-300 transition-colors focus:border-gray-500 focus:ring-transparent placeholder:text-gray-400 placeholder:label1-regular hover:border-gray-400"
      />
    </div>
  );
};

export default TaskSearchInput;
