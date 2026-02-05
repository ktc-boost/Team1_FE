import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/shadcn/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/shadcn/dropdown-menu';
import { useTaskModals } from '@/features/task/hooks/modal/useTaskModals';

interface TaskControlDropdownProps {
  onEdit?: () => void;
  onClickDelete?: () => void;
}

const TaskControlDropdown = ({ onEdit, onClickDelete }: TaskControlDropdownProps) => {
  const { showDeleteTaskModal } = useTaskModals();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="absolute top-5 right-5 hover:bg-gray-100 transition-colors z-10 cursor-pointer"
        >
          <MoreVertical className="text-gray-500 !w-6 !h-6" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="border-gray-300">
        {/* 수정 */}
        <DropdownMenuItem onClick={onEdit} className="flex items-center gap-2 px-3 py-2">
          <Pencil className="w-4 h-4" />
          <span className="text-sm">수정</span>
        </DropdownMenuItem>

        {/* 삭제 */}
        <DropdownMenuItem
          onClick={() => {
            if (onClickDelete) showDeleteTaskModal(onClickDelete);
          }}
          className="flex items-center gap-2 px-3 py-2 text-red-500 hover:text-red-500"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
          <span className="text-sm">삭제</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TaskControlDropdown;
