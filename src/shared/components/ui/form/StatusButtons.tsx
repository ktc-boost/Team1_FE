import { cn } from '@/shared/lib/utils';
import { TASK_STATUS_META } from '@/features/task/constants/task.domain.constants';
import type { TaskStatus } from '@/features/task/types/task.domain.types';
import { Button } from '@/shared/components/shadcn/button';

interface StatusButtonsProps {
  statusList: TaskStatus[];
  selectedStatus: TaskStatus;
  setStatus: (status: TaskStatus) => void;
  disabled?: boolean;
}

const StatusButtons = ({ statusList, selectedStatus, setStatus, disabled }: StatusButtonsProps) => (
  <div className="flex gap-2 flex-wrap">
    {statusList.map((s) => {
      const matched = TASK_STATUS_META.find((c) => c.status === s);
      return (
        <Button
          key={s}
          variant={selectedStatus === s ? 'default' : 'outline'}
          onClick={() => setStatus(s)}
          disabled={disabled}
          className={cn(
            'px-3 h-7 border-boost-blue-dark/20 rounded-md text-xs border transition-all',
            selectedStatus === s
              ? 'bg-boost-blue text-white border-boost-blue shadow-sm hover:bg-boost-blue'
              : 'hover:bg-boost-blue/10',
          )}
        >
          {matched ? matched.title : s}
        </Button>
      );
    })}
  </div>
);

export default StatusButtons;
