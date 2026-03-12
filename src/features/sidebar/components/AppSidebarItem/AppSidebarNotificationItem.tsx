import { Bell } from 'lucide-react';
import { Badge } from '@/shared/components/shadcn/badge';
import { DropdownMenu, DropdownMenuTrigger } from '@/shared/components/shadcn/dropdown-menu';
import { useNotificationsQuery } from '@/features/notifications/hooks/useNotificationsQuery';
import { useNotificationCountsQuery } from '@/features/notifications/hooks/useNotificationCountsQuery';
import NotificationListDropdown from '@/features/sidebar/components/NotificationListDropdown/NotificationListDropdown';
import AppSidebarBaseItem from '@/features/sidebar/components/AppSidebarItem/AppSidebarBaseItem';

const AppSidebarNotificationItem = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useNotificationsQuery();
  const { data: notificationCountData } = useNotificationCountsQuery();

  const notifications = data?.pages.flatMap((p) => p.notifications) ?? [];
  const unreadCount = notificationCountData?.unreadCount ?? 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <AppSidebarBaseItem tooltip="알림">
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <Badge className="absolute top-1 right-0.5 h-3 min-w-[0.75rem] p-0 bg-red-500 text-white text-[10px]">
                {unreadCount}
              </Badge>
            )}
          </AppSidebarBaseItem>
        </div>
      </DropdownMenuTrigger>

      <NotificationListDropdown
        notifications={notifications}
        hasNextPage={!!hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </DropdownMenu>
  );
};

export default AppSidebarNotificationItem;
