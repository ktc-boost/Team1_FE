import { DropdownMenuItem } from '@/shared/components/shadcn/dropdown-menu';
import { Bell, Check } from 'lucide-react';
import { Button } from '@/shared/components/shadcn/button';
import { cn } from '@/shared/lib/utils';
import type { NotificationItem } from '@/features/notifications/types/NotificationsType';

export interface NotificationListItemProps {
  notification: NotificationItem;
  onMarkAsRead: (id: string) => void;
}

const NotificationListItem = ({ notification, onMarkAsRead }: NotificationListItemProps) => {
  const n = notification;

  return (
    <DropdownMenuItem
      className={cn(
        'group relative rounded-xl transition-colors m-1',
        'p-2 sm:p-3',
        'hover:bg-transparent focus:bg-transparent',
        !n.read && 'bg-blue-50 hover:bg-blue-50 focus:bg-blue-50',
      )}
    >
      <div className="flex gap-2 sm:gap-3 w-full">
        <div
          className="
      flex-shrink-0
      w-7 h-7
      sm:w-10 sm:h-10
      rounded-full
      flex items-center justify-center
      bg-blue-100
    "
        >
          <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-boost-blue" />
        </div>

        <div className="flex-1 min-w-0">
          <p
            className={cn(
              'text-xs font-bold sm:text-[0.875rem] ',
              n.read ? 'text-gray-500/70' : 'text-gray-800',
            )}
          >
            {n.title}
          </p>
          <p className={cn('text-xs mb-1 mt-1', n.read ? 'text-gray-500/70' : 'text-gray-700')}>
            {n.message}
          </p>

          <p className="text-[10px] sm:text-xs text-gray-500/60">
            {new Date(n.createdAt).toLocaleString('ko-KR', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>

        {!n.read && (
          <Button
            variant="ghost"
            size="icon"
            className="
          h-6 w-6
          sm:h-7 sm:w-7
          hover:bg-blue-100
          cursor-pointer
        "
            onClick={(e) => {
              e.stopPropagation();
              onMarkAsRead(n.id);
            }}
          >
            <Check className="h-3 w-3 sm:h-4 sm:w-4 text-boost-blue" />
          </Button>
        )}
      </div>
    </DropdownMenuItem>
  );
};

export default NotificationListItem;
