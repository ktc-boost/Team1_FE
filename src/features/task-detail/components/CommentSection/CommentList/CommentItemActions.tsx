import { cn } from '@/shared/lib/utils';
import { EllipsisVertical } from 'lucide-react';
import { Button } from '@/shared/components/shadcn/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
} from '@/shared/components/shadcn/dropdown-menu';

interface CommentItemActionsProps {
  onCommentEdit: () => void;
  onCommentDelete: () => void;
}

const CommentItemActions = ({ onCommentEdit, onCommentDelete }: CommentItemActionsProps) => {
  const menuCommonClasses = 'px-3 py-2 !label1-regular cursor-pointer hover:bg-gray-200';

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCommentEdit();
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCommentDelete();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="focus:ring-transparent hover:bg-gray-200"
          onClick={(e) => e.stopPropagation()}
        >
          <EllipsisVertical className="w-4 h-4 text-gray-600" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-32 bg-white border-gray-200">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={handleEditClick}
            className={cn(menuCommonClasses, 'text-gray-700 hover:text-gray-800')}
          >
            수정
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDeleteClick}
            className={cn(menuCommonClasses, 'text-red-600 hover:text-red-500')}
          >
            삭제
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CommentItemActions;
