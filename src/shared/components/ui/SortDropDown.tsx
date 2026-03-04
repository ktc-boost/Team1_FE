import { Button } from '@/shared/components/shadcn/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/shadcn/dropdown-menu';
import { SortAscIcon, SortDescIcon } from 'lucide-react';
import { useSortStore } from '@/features/board/store/useSortStore';
import { useState } from 'react';
import { DIRECTION, SORT_OPTIONS } from '@/features/board/constants/board.sort.constants';

const SortDropDown = () => {
  const { sortBy, direction, setSortBy, toggleDirection } = useSortStore();
  const [open, setOpen] = useState(false);

  const handleItemClick = (value: (typeof SORT_OPTIONS)[number]['value']) => {
    if (sortBy === value) {
      toggleDirection();
    } else {
      setSortBy(value);
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-gray-300 focus:border-gray-300 focus:ring-transparent"
          onClick={() => setOpen((prev) => !prev)}
        >
          {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
          {direction === DIRECTION.ASC ? <SortAscIcon size={16} /> : <SortDescIcon size={16} />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36 border-gray-300" sideOffset={3}>
        {SORT_OPTIONS.map((opt) => (
          <DropdownMenuItem
            key={opt.value}
            className="flex items-center justify-between"
            onClick={(e) => {
              e.preventDefault();
              handleItemClick(opt.value);
            }}
          >
            <span>{opt.label}</span>
            {sortBy === opt.value &&
              (direction === DIRECTION.ASC ? (
                <SortAscIcon size={16} />
              ) : (
                <SortDescIcon size={16} />
              ))}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortDropDown;
