import { DropdownMenuLabel } from '@/shared/components/shadcn/dropdown-menu';
import { Button } from '@/shared/components/shadcn/button';

export interface NotificationDropdownHeaderProps {
  unreadCount?: number;
  onMarkAll: () => void;
}

const NotificationDropdownHeader = ({
  unreadCount,
  onMarkAll,
}: NotificationDropdownHeaderProps) => {
  return (
    <DropdownMenuLabel
      className="
  flex items-center justify-between
  py-2 px-3
  sm:py-3 sm:px-4
"
    >
      <span className="text-sm sm:text-base font-semibold">알림</span>

      {unreadCount ? (
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="text-xs sm:label2-regular text-gray-500">안읽음 {unreadCount}</span>
          <Button
            variant="defaultBoost"
            onClick={onMarkAll}
            className="
          text-xs sm:label2-regular
          px-2 py-0
          sm:px-3
        "
          >
            모두 읽음
          </Button>
        </div>
      ) : null}
    </DropdownMenuLabel>
  );
};

export default NotificationDropdownHeader;
