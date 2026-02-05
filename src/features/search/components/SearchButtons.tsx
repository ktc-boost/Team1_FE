import { useState } from 'react';
import { Search, Tag } from 'lucide-react';
import { Button } from '@/shared/components/shadcn/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/shadcn/dropdown-menu';
import TitleSearchInput from '@/features/search/components/TaskSearchInput';
import TagSearchInput from '@/features/search/components/TagSearchInput';
import type { BoardKey } from '@/features/board/types/boardTypes';

interface SearchButtonsProps {
  boardKey: BoardKey;
}

const SearchButtons = ({ boardKey }: SearchButtonsProps) => {
  const [titleOpen, setTitleOpen] = useState(false);
  const [tagOpen, setTagOpen] = useState(false);

  return (
    <div className="flex gap-2">
      <DropdownMenu open={titleOpen} onOpenChange={setTitleOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="border-gray-300 shadow-xs">
            <Search size={18} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          side="bottom"
          sideOffset={2}
          className="p-2 w-fit border-none shadow-sm"
        >
          <TitleSearchInput boardKey={boardKey} />
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu open={tagOpen} onOpenChange={setTagOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="border-gray-300 shadow-xs">
            <Tag size={18} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          side="bottom"
          sideOffset={2}
          className="p-2 w-fit border-none shadow-sm"
        >
          <TagSearchInput />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SearchButtons;
