import { DropdownMenuContent } from '@/shared/components/shadcn/dropdown-menu';
import { useNotificationCountsQuery } from '@/features/notifications/hooks/useNotificationCountsQuery';
import { useMarkNotificationAsReadMutation } from '@/features/notifications/hooks/useMarkNotificationAsReadMutation';
import NotificationDropdownHeader from '@/features/notifications/components/notificationDropdownMenu/NotificationDropdownHeader';
import NotificationList from '@/features/notifications/components/notificationDropdownMenu/NotificationList';
import type { NotificationItem } from '@/features/notifications/types/NotificationsType';
import { useMarkAllNotificationAsReadMutation } from '@/features/notifications/hooks/useMarkAllNotificationAsReadMutation';

export interface NotificationDropdownMenuProps {
  notifications: NotificationItem[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}

const NotificationDropdownMenu = ({
  notifications,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}: NotificationDropdownMenuProps) => {
  const { data: notificationCountData } = useNotificationCountsQuery();
  const { mutate: markAsRead } = useMarkNotificationAsReadMutation();
  const { mutate: markAllAsRead } = useMarkAllNotificationAsReadMutation();

  return (
    <DropdownMenuContent
      side="right"
      align="start"
      sideOffset={16}
      className="
    w-72 h-80
    sm:w-96 sm:h-[450px]
    border border-gray-300 bg-white shadow-lg rounded-md flex flex-col
  "
    >
      <NotificationDropdownHeader
        unreadCount={notificationCountData?.unreadCount}
        onMarkAll={markAllAsRead}
      />

      <NotificationList
        notifications={notifications}
        onMarkAsRead={markAsRead}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </DropdownMenuContent>
  );
};

export default NotificationDropdownMenu;
