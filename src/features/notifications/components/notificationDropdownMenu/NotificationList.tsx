import { DropdownMenuSeparator } from '@/shared/components/shadcn/dropdown-menu';
import { Bell } from 'lucide-react';
import NotificationListItem from '@/features/notifications/components/notificationDropdownMenu/NotificationListItem';
import type { NotificationItem } from '@/features/notifications/types/NotificationsType';
import NotificationLoadMoreButton from '@/features/notifications/components/notificationDropdownMenu/NotificationLoadMoreButton';

export interface NotificationListProps {
  notifications: NotificationItem[];
  onMarkAsRead: (id: string) => void;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}

const NotificationList = ({
  notifications,
  onMarkAsRead,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}: NotificationListProps) => {
  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <Bell className="h-12 w-12 mb-3 opacity-20" />
          <p className="text-sm">새로운 알림이 없습니다</p>
        </div>
      ) : (
        <div className="py-1">
          {notifications.map((n, index) => (
            <div key={n.id}>
              <NotificationListItem notification={n} onMarkAsRead={onMarkAsRead} />
              {index < notifications.length - 1 && <DropdownMenuSeparator />}
            </div>
          ))}

          {hasNextPage && (
            <NotificationLoadMoreButton isFetching={isFetchingNextPage} onClick={fetchNextPage} />
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationList;
