import { Button } from '@/shared/components/shadcn/button';
import { cn } from '@/shared/lib/utils';
import { CheckCircle, CircleArrowLeft } from 'lucide-react';

interface ReviewerButtonProps {
  isApprovedByMe: boolean;
  approvedCount: number;
  requiredReviewerCount: number;
  onApprove: () => void;
}

export const ReviewerActionButton = ({
  isApprovedByMe,
  approvedCount,
  requiredReviewerCount,
  onApprove,
}: ReviewerButtonProps) => {
  const isFullyApproved = approvedCount >= requiredReviewerCount;
  const disabled = isApprovedByMe || isFullyApproved;
  const defaultIconClass = 'w-5 h-5 text-white';

  const getButtonClass = () => {
    if (disabled) return 'bg-green-600 opacity-70 cursor-not-allowed';
    return 'bg-boost-blue hover:bg-boost-blue-hover';
  };

  return (
    <Button
      onClick={onApprove}
      disabled={disabled}
      className={cn(
        'text-xs sm:!label2-regular flex flex-row gap-2 rounded-md text-white',
        getButtonClass(),
      )}
    >
      {isApprovedByMe ? (
        <CheckCircle className={defaultIconClass} />
      ) : (
        <CircleArrowLeft className={defaultIconClass} />
      )}
      {isApprovedByMe ? '검토 완료됨' : isFullyApproved ? '검토 마감됨' : '승인하기'}
    </Button>
  );
};
