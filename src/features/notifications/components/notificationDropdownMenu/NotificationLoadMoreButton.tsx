import { ChevronDown } from 'lucide-react';
import { Button } from '@/shared/components/shadcn/button';
import InlineLoader from '@/shared/components/ui/loading/InlineLoader';

export interface NotificationLoadMoreButtonProps {
  isFetching: boolean;
  onClick: () => void;
}

const NotificationLoadMoreButton = ({ isFetching, onClick }: NotificationLoadMoreButtonProps) => {
  return (
    <div className="p-2 border-t border-gray-200">
      <Button
        variant="ghost"
        className="w-full justify-center gap-2 !body2-regular hover:text-gray-900 hover:bg-gray-50"
        onClick={onClick}
        disabled={isFetching}
        aria-busy={isFetching}
      >
        <span className="inline-flex h-4 w-4 items-center justify-center">
          {isFetching ? <InlineLoader size={4} /> : <ChevronDown className="h-4 w-4" />}
        </span>

        <span>{isFetching ? '불러오는 중…' : '더 보기'}</span>
      </Button>
    </div>
  );
};

export default NotificationLoadMoreButton;
