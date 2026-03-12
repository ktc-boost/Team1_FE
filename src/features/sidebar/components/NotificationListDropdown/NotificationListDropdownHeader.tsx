import { DropdownMenuLabel } from '@/shared/components/shadcn/dropdown-menu';
import { Button } from '@/shared/components/shadcn/button';

interface NotificationListDropdownHeaderProps {
  unreadCount?: number;
  onMarkAll: () => void;
}

const NotificationListDropdownHeader = ({
  unreadCount,
  onMarkAll,
}: NotificationListDropdownHeaderProps) => {
  const hasUnread = unreadCount && unreadCount > 0;

  return (
    <DropdownMenuLabel className="flex items-center justify-between py-2 px-3 sm:py-3 sm:px-4">
      <span className="!label1-bold">알림</span>

      {hasUnread && (
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="caption1-regular sm:label2-regular text-gray-500">
            안읽음 {unreadCount}
          </span>
          <Button
            variant="defaultBoost"
            onClick={onMarkAll}
            className="caption1-regular sm:label2-regular px-2 py-0 sm:px-3 rounded-full"
          >
            모두 읽음
          </Button>
        </div>
      )}
    </DropdownMenuLabel>
  );
};

export default NotificationListDropdownHeader;
