import { Checkbox } from '@/shared/components/shadcn/checkbox';
import { cn } from '@/shared/lib/utils';

interface UrgentToggleProps {
  urgent: boolean;
  setUrgent: (v: boolean) => void;
  disabled?: boolean;
}

const UrgentToggle = ({ urgent, setUrgent, disabled }: UrgentToggleProps) => {
  const handleToggle = () => {
    if (!disabled) setUrgent(!urgent);
  };

  return (
    <div
      onClick={handleToggle}
      className={cn(
        'flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all select-none',
        urgent ? 'bg-red-50 border-red-300' : 'bg-gray-50 border-gray-200 hover:border-gray-300',
        disabled && 'opacity-50 cursor-not-allowed',
      )}
    >
      <Checkbox
        checked={urgent}
        onCheckedChange={handleToggle}
        className="cursor-pointer data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
      />
      <span className={cn('label2-regular', urgent ? 'text-red-700' : 'text-gray-700')}>
        이 할 일은 서둘러서 처리해야 해요!
      </span>
    </div>
  );
};

export default UrgentToggle;
