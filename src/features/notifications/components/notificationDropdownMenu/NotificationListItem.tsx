import { DropdownMenuItem } from '@/shared/components/shadcn/dropdown-menu';
import { Bell } from 'lucide-react';
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
        'group relative rounded-xl transition-colors m-0.5 sm:m-1 p-2 sm:p-3 hover:bg-transparent focus:bg-transparent',
        !n.read && 'bg-blue-50 hover:bg-blue-50 focus:bg-blue-50',
      )}
      onSelect={(e) => {
        e.preventDefault();
        onMarkAsRead(n.id);
      }}
    >
      <div className="flex gap-2 sm:gap-3 w-full">
        <div
          className={cn(
            'flex-shrink-0 w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center',
            n.read ? 'bg-gray-100' : 'bg-blue-100',
          )}
        >
          <Bell
            className={cn('w-4 h-4 sm:w-5 sm:h-5', n.read ? 'text-gray-400/70' : 'text-boost-blue')}
          />
        </div>

        <div className="flex-1 min-w-0">
          <p
            className={cn(
              'text-xs font-bold sm:text-[0.875rem]',
              n.read ? 'text-gray-500/70' : 'text-gray-800',
            )}
          >
            {n.title}
          </p>
          <p
            className={cn(
              'caption1-regular mt-1 mb-1 leading-4 h-8 overflow-hidden break-words',
              n.read ? 'text-gray-500/70' : 'text-gray-700',
            )}
          >
            {n.message}
          </p>

          <p className="text-[10px] sm:caption1-regular text-gray-500/60">
            {new Date(n.createdAt).toLocaleString('ko-KR', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      </div>
    </DropdownMenuItem>
  );
};

export default NotificationListItem;
