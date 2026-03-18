import { Bell } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { DropdownMenuItem } from '@/shared/components/shadcn/dropdown-menu';
import { formatShortDateTime } from '@/shared/utils/dateUtils';
import type { NotificationItem } from '@/features/notifications/types/NotificationsType';

interface NotificationListItemProps {
  notification: NotificationItem;
  onMarkAsRead: (id: string) => void;
}

const NotificationListItem = ({ notification, onMarkAsRead }: NotificationListItemProps) => {
  const { id, read, title, message, createdAt } = notification;

  const handleSelect = (e: Event) => {
    e.preventDefault();
    onMarkAsRead(id);
  };

  return (
    <DropdownMenuItem
      className={cn(
        'group relative rounded-xl transition-colors m-0.5 sm:m-1 p-2 sm:p-3 hover:bg-transparent focus:bg-transparent',
        !read && 'bg-blue-50 hover:bg-blue-50 focus:bg-blue-50',
      )}
      onSelect={handleSelect}
    >
      <div className="flex gap-2 sm:gap-3 w-full">
        <div
          className={cn(
            'flex-shrink-0 w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center',
            read ? 'bg-gray-100' : 'bg-blue-100',
          )}
        >
          <Bell
            className={cn('w-4 h-4 sm:w-5 sm:h-5', read ? 'text-gray-400/70' : 'text-boost-blue')}
          />
        </div>

        <div className="flex-1 min-w-0">
          <p
            className={cn(
              'caption1-bold sm:label2-bold',
              read ? 'text-gray-500/70' : 'text-gray-800',
            )}
          >
            {title}
          </p>

          <p
            className={cn(
              'caption1-regular mt-1 mb-1 leading-4 h-8 overflow-hidden break-words',
              read ? 'text-gray-500/70' : 'text-gray-700',
            )}
          >
            {message}
          </p>

          <p className="text-[10px] sm:caption1-regular text-gray-500/60">
            {formatShortDateTime(createdAt)}
          </p>
        </div>
      </div>
    </DropdownMenuItem>
  );
};

export default NotificationListItem;
