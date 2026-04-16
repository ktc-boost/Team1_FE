import { X } from 'lucide-react';
import { Button } from '@/shared/components/shadcn/button';
import { Badge } from '@/shared/components/shadcn/badge';
import { getColorStyleForTag } from '@/features/tag/utils/tagUtils';
import type { Tag } from '@/features/tag/types/tagTypes';

interface TagChipProps {
  tag: Tag;
  onRemove: (tagId: string) => void;
}

const TagChip = ({ tag, onRemove }: TagChipProps) => {
  const TagStyle = getColorStyleForTag(tag);
  return (
    <Badge
      key={tag.tagId}
      className="cursor-default py-1 gap-1.5 shadow-sm transition-all duration-200 animate-in fade-in slide-in-from-left-2 max-w-40"
      style={TagStyle}
    >
      <span className="truncate">{tag.name}</span>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => onRemove(tag.tagId)}
        className="text-white shadow-none w-4 h-4 hover:text-gray-900 hover:bg-transparent ml-1 cursor-pointer"
      >
        <X className="w-3 h-3" />
      </Button>
    </Badge>
  );
};

export default TagChip;
