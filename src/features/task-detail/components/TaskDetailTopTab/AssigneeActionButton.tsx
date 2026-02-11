import { useState, useEffect } from 'react';
import { Button } from '@/shared/components/shadcn/button';
import { cn } from '@/shared/lib/utils';
import { CheckCircle, CircleArrowRight, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

interface AssigneeButtonProps {
  uiStatus: string;
  approvedCount: number;
  requiredReviewerCount: number;
  onAction: () => Promise<void> | void;
}

export const AssigneeActionButton = ({
  uiStatus,
  approvedCount,
  requiredReviewerCount,
  onAction,
}: AssigneeButtonProps) => {
  const [isCompleting, setIsCompleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const isDoneReady = approvedCount >= requiredReviewerCount;
  const isReview = uiStatus === 'REVIEW';
  const defaultIconClass = 'w-5 h-5 text-white';
  const disabled = isDoneReady ? isCompleted || isCompleting : isCompleting;

  useEffect(() => {
    if (uiStatus === 'DONE') setIsCompleted(true);
  }, [uiStatus]);

  const handleAction = async () => {
    try {
      setIsCompleting(true);
      await onAction();
      setIsCompleted(true);
      toast.success('할 일이 완료되었습니다!', { position: 'top-center' });
    } catch (err) {
      toast.error('완료 처리 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setIsCompleting(false);
    }
  };

  if (isDoneReady) {
    return (
      <Button
        onClick={handleAction}
        disabled={disabled}
        className={cn(
          'text-xs sm:label2-regular flex flex-row gap-2 rounded-md text-white',
          isCompleted
            ? 'bg-green-600 opacity-70 cursor-not-allowed'
            : 'bg-green-700 hover:bg-green-600',
        )}
      >
        <CheckCircle className={defaultIconClass} />
        {isCompleted ? '할 일 완료됨' : isCompleting ? '완료 중...' : '할 일 완료하기'}
      </Button>
    );
  }

  return (
    <Button
      onClick={onAction}
      disabled={disabled}
      className={cn(
        'text-xs sm:!label2-regular rounded-md flex flex-row gap-2 text-white',
        isReview
          ? 'bg-boost-orange hover:bg-boost-orange-hover'
          : 'bg-boost-blue hover:bg-boost-blue-hover',
      )}
    >
      {isReview ? (
        <RefreshCw className={cn(defaultIconClass)} />
      ) : (
        <CircleArrowRight className={cn(defaultIconClass)} />
      )}
      {isReview ? '검토 재요청' : '검토 요청하기'}
    </Button>
  );
};
