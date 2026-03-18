import {
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '@/shared/components/shadcn/dropdown-menu';
import type { NotificationItem } from '@/features/notifications/types/NotificationsType';
import { useNotificationCountsQuery } from '@/features/notifications/hooks/useNotificationCountsQuery';
import { useMarkNotificationAsReadMutation } from '@/features/notifications/hooks/useMarkNotificationAsReadMutation';
import { useMarkAllNotificationAsReadMutation } from '@/features/notifications/hooks/useMarkAllNotificationAsReadMutation';
import NotificationDropdownHeader from '@/features/sidebar/components/NotificationListDropdown/NotificationListDropdownHeader';
import NotificationList from '@/features/sidebar/components/NotificationListDropdown/NotificationList';

interface NotificationDropdownProps {
  notifications: NotificationItem[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}

const NotificationDropdown = ({
  notifications,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}: NotificationDropdownProps) => {
  const { data: notificationCountData } = useNotificationCountsQuery();
  const { mutate: markAsRead } = useMarkNotificationAsReadMutation();
  const { mutate: markAllAsRead } = useMarkAllNotificationAsReadMutation();

  return (
    <DropdownMenuContent
      side="right"
      align="start"
      sideOffset={30}
      className="w-72 h-80 sm:w-96 sm:h-100 border-gray-300 bg-white flex flex-col"
    >
      <NotificationDropdownHeader
        unreadCount={notificationCountData?.unreadCount}
        onMarkAll={markAllAsRead}
      />
      <DropdownMenuSeparator />

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

export default NotificationDropdown;
