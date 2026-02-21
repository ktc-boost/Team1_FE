import { Download, ChevronRight, MoreVertical } from 'lucide-react';
import { Button } from '@/shared/components/shadcn/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/shadcn/dropdown-menu';

interface FileMobileActionMenuProps {
  onNavigate: () => void;
  onDownload: () => void;
}

const FileMobileActionMenu = ({ onNavigate, onDownload }: FileMobileActionMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-40 bg-white rounded-lg shadow-md border border-gray-300 p-1"
      >
        <DropdownMenuItem
          className="flex items-center justify-between px-3 py-2.5 cursor-pointer focus:bg-gray-100 rounded-md transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate();
          }}
        >
          <span className="label1-regular">할 일로 이동</span>
          <ChevronRight className="w-4 h-4" />
        </DropdownMenuItem>

        <DropdownMenuItem
          className="flex items-center justify-between px-3 py-2.5 cursor-pointer focus:bg-gray-100 rounded-md transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onDownload();
          }}
        >
          <span className="label1-regular">다운로드</span>
          <Download className="w-4 h-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FileMobileActionMenu;
