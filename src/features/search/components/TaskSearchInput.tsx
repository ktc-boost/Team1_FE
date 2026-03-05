import { useEffect } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Input } from '@/shared/components/shadcn/input';
import { useDebounce } from '@/shared/hooks/useDebounce';
import type { BoardKey } from '@/features/board/types/board.domain.types';
import { useBoardSearchStore } from '@/features/board/store/useBoardSearchStore';

interface SearchInputProps {
  boardKey: BoardKey;
}

const TaskSearchInput = ({ boardKey }: SearchInputProps) => {
  const search = useBoardSearchStore((state) => state.searchMap[boardKey]);
  const setSearch = useBoardSearchStore((state) => state.setSearch);

  const debouncedValue = useDebounce(search, 300);

  useEffect(() => {
    setSearch(boardKey, debouncedValue);
  }, [debouncedValue, boardKey, setSearch]);

  return (
    <div className={cn('relative w-[300px]', boardKey === 'myTasks' ? 'mr-3' : 'mr-0')}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <Input
        value={search}
        onChange={(e) => setSearch(boardKey, e.target.value)}
        placeholder="검색어를 입력하세요"
        className="w-full h-9 sm:h-10 px-3 pl-10 rounded-lg border-gray-300 transition-colors focus:border-gray-500 focus:ring-transparent placeholder:text-gray-400 placeholder:label1-regular hover:border-gray-400"
      />
    </div>
  );
};

export default TaskSearchInput;
