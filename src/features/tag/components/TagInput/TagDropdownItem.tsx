import { Check, MoreHorizontal, Pencil, Trash2, X } from 'lucide-react';
import { Button } from '@/shared/components/shadcn/button';
import { Input } from '@/shared/components/shadcn/input';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/shared/components/shadcn/dropdown-menu';
import { getColorStyleForTag } from '@/features/tag/utils/tagUtils';
import type { Tag } from '@/features/tag/types/tagTypes';
import { Badge } from '@/shared/components/shadcn/badge';
import { cn } from '@/shared/lib/utils';

interface TagDropdownItemProps {
  tag: Tag;
  isSelected: boolean;
  editingTagId: string | null;
  editValue: string;
  setEditValue: (val: string) => void;
  setEditingTagId: (id: string | null) => void;
  onRemove: (tagId: string) => void;
  onSelect: (tag: Tag) => void;
  onEdit: (tagId: string, newName: string) => void;
  onDelete: (tagId: string) => void;
}

const TagDropdownItem = ({
  tag,
  isSelected,
  editingTagId,
  editValue,
  setEditValue,
  setEditingTagId,
  onRemove,
  onSelect,
  onEdit,
  onDelete,
}: TagDropdownItemProps) => {
  const TagStyle = getColorStyleForTag(tag);

  const handleConfirmEdit = () => {
    if (editValue.trim()) onEdit(tag.tagId, editValue.trim());
    setEditingTagId(null);
  };

  if (editingTagId === tag.tagId) {
    return (
      <div className="flex-1 flex items-center gap-2 px-3 py-2">
        <Input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleConfirmEdit();
            if (e.key === 'Escape') setEditingTagId(null);
          }}
          className="flex-1 h-8 ml-6 focus:ring-transparent focus:border-gray-400"
        />
        <Button
          size="icon"
          variant="defaultBoost"
          onClick={handleConfirmEdit}
          className="w-7 h-7 rounded-full"
        >
          <Check className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setEditingTagId(null)}
          className="h-8 px-3 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center px-3 py-2 transition-colors hover:bg-gray-50">
      <div
        onClick={() => (isSelected ? onRemove(tag.tagId) : onSelect(tag))}
        className="flex-1 flex items-center gap-2.5 cursor-pointer py-1"
      >
        <div
          className={cn(
            'w-4 h-4 rounded border-2 flex items-center justify-center transition-colors',
            isSelected
              ? 'bg-boost-blue border-boost-blue'
              : 'border-gray-300 hover:border-gray-400',
          )}
        >
          {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
        </div>
        <Badge className="px-3 py-1 shadow-sm" style={TagStyle}>
          {tag.name}
        </Badge>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="w-8 h-8 hover:bg-gray-200 rounded-full transition-colors"
          >
            <MoreHorizontal className="w-4 h-4 text-gray-500" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="top"
          align="start"
          sideOffset={8}
          className="w-32 border-gray-200 shadow-sm"
        >
          <DropdownMenuItem
            onClick={() => {
              setEditingTagId(tag.tagId);
              setEditValue(tag.name);
            }}
          >
            <Pencil className="w-3.5 h-3.5 mr-2" /> 수정
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onDelete(tag.tagId)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-3.5 h-3.5 mr-2 text-red-600 hover:text-red-700" /> 삭제
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TagDropdownItem;
