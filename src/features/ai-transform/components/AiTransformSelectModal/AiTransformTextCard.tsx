import { Button } from '@/shared/components/shadcn/button';
import { cn } from '@/shared/lib/utils';
import { AI_COMMENT_SIDE } from '@/features/ai-transform/constants/ai-transform.ui.constants';
import type { AiCommentSide } from '@/features/ai-transform/types/ai-transform.ui.types';
import type React from 'react';

interface AiTransformTextCardProps {
  type: AiCommentSide;
  text: string | null;
  onSelect: (e: React.MouseEvent) => void;
  onHover: (side: AiCommentSide) => void;
  isHovered: boolean;
}

const AiTransformTextCard = ({
  type,
  text,
  onSelect,
  onHover,
  isHovered,
}: AiTransformTextCardProps) => {
  const color = type === AI_COMMENT_SIDE.ORIGIN ? 'boost-orange' : 'boost-blue';
  const label = type === AI_COMMENT_SIDE.ORIGIN ? '원래 댓글 선택' : 'Boo의 댓글 선택';

  return (
    <div
      className={cn(
        'flex flex-col flex-1 w-full rounded-md p-4 h-40 sm:h-92 bg-gray-50 border border-gray-300 shadow-sm transition-colors duration-300',
        isHovered && `border-${color}`,
      )}
      onMouseEnter={() => onHover(type)}
      onMouseLeave={() => onHover(AI_COMMENT_SIDE.DEFAULT)}
    >
      <div
        className={cn('flex-1 overflow-y-auto mb-4 label2-regular sm:label1-regular break-words')}
      >
        {text}
      </div>

      <Button
        variant="default"
        className={cn(
          'w-full duration-300 !label2-regular sm:!label1-regular border-none',
          `bg-${color} hover:bg-${color}-hover`,
        )}
        onClick={onSelect}
      >
        {label}
      </Button>
    </div>
  );
};

export default AiTransformTextCard;
