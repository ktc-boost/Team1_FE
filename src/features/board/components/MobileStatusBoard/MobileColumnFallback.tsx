import { AlertCircle } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Avatar, AvatarGroup } from '@/shared/components/shadcn/avatar';
import { STATUS_THEME } from '@/features/board/constants/board.ui.constants';
import { TASK_STATUS_META } from '@/features/task/constants/task.domain.constants';
import type { TaskStatus } from '@/features/task/types/task.domain.types';

interface MobileColumnFallbackProps {
  status: TaskStatus;
  state?: 'loading' | 'error';
  isAllClosed?: boolean;
}

/* 📍TODO: 모바일 상태 버전 칸반보드용 스켈레톤 Fallback. UI 확정 후 수정 필요. */
const MobileColumnFallback = ({
  status,
  state = 'loading',
  isAllClosed = true,
}: MobileColumnFallbackProps) => {
  const columnTitle = TASK_STATUS_META.find((c) => c.status === status)?.title || status;
  const theme = STATUS_THEME[status] ?? STATUS_THEME.TODO;
  const Icon = theme.icon;

  return (
    <div
      className={cn(
        'rounded-md bg-white shadow-sm overflow-hidden w-full mb-3 border-0',
        isAllClosed ? 'flex-1' : 'shrink-0',
        theme.border,
        state === 'loading' && 'animate-pulse',
      )}
    >
      <div className="w-full flex flex-col gap-4 px-4 py-3.5">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center justify-between gap-2 w-full h-6">
            <div className="flex items-center gap-2 min-w-0">
              <span className={cn('opacity-20', theme.iconColor)}>
                <Icon className="w-4 h-4" />
              </span>
              <span className="label1-bold text-gray-400">{columnTitle}</span>
              <div className={cn('w-6 h-5 rounded-full opacity-20', theme.pill)} />
            </div>
            <div className="w-4 h-4 rounded bg-gray-50" />
          </div>

          <div className="w-full h-3 flex items-center">
            <div className="w-3/4 h-3 bg-gray-50 rounded-sm" />
          </div>

          <div className="flex items-center gap-2 w-full">
            <div className={cn('flex-1 h-1.5 rounded-full', theme.track)}>
              <div className={cn('h-full w-1/3 rounded-full opacity-30', theme.accent)} />
            </div>
            <div className={cn('w-10 h-3 rounded-sm opacity-20', theme.labelColor)} />
          </div>
        </div>

        <div className="flex items-center justify-between w-full h-6 [@media(max-height:800px)]:hidden">
          {state === 'loading' ? (
            <AvatarGroup>
              {[1, 2, 3].map((i) => (
                <Avatar key={i} className="w-7 h-7 border-1 border-white bg-gray-300" />
              ))}
            </AvatarGroup>
          ) : (
            <div className="flex items-center gap-1.5 text-red-400">
              <AlertCircle className="w-3.5 h-3.5" />
              <span className="caption1-regular">불러오기 실패</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileColumnFallback;
