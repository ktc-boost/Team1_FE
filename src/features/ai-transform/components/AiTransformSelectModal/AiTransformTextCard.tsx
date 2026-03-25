import { Button } from '@/shared/components/shadcn/button';
import { cn } from '@/shared/lib/utils';

interface AiTransformTextCardProps {
  type: 'original' | 'transformed';
  text: string | null;
  onSelect: () => void;
  onHover: (side: 'original' | 'transformed' | null) => void;
  isHovered: boolean;
}

const AiTransformTextCard = ({
  type,
  text,
  onSelect,
  onHover,
  isHovered,
}: AiTransformTextCardProps) => {
  const color = type === 'original' ? 'boost-orange' : 'boost-blue';
  const label = type === 'original' ? '원래 댓글 선택' : 'Boo의 댓글 선택';

  return (
    <div
      className={cn(
        'flex flex-col flex-1 w-full rounded-md p-4 h-40 sm:h-92 bg-gray-50 border border-gray-300 shadow-sm transition-colors duration-300',
        isHovered && `border-${color}`,
      )}
      onMouseEnter={() => onHover(type)}
      onMouseLeave={() => onHover(null)}
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
