import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { getRemainingSeconds, formatSecondsMMSS } from '@/shared/utils/dateUtils';
import MovingBoo from '@/shared/components/ui/MovingBoo';
import { ERROR } from '@/shared/error/constants/error.constants';
import { getErrorMessage } from '@/shared/error/utils/error.utils';
import { ApiError } from '@/shared/error/types/apiError.types';
import { useUpdateTaskStatusMutation } from '@/features/task/hooks/mutation/useUpdateTaskStatusMutation';
import { useRequestReviewMutation } from '@/features/task/hooks/mutation/useRequestReviewMutation';
import { TASK_STATUS } from '@/features/task/constants/task.domain.constants';

interface UseAssigneeTaskProps {
  projectId: string;
  taskId: string;
  taskStatus: string;
  approvedCount: number;
  requiredReviewerCount: number;
  reReviewRequestedAt?: string;
}

export const useAssigneeTask = ({
  projectId,
  taskId,
  taskStatus,
  approvedCount: initialApprovedCount,
  requiredReviewerCount,
  reReviewRequestedAt,
}: UseAssigneeTaskProps) => {
  const [uiStatus, setUiStatus] = useState(taskStatus);
  const [approvedCount] = useState(initialApprovedCount);

  const { mutateAsync: updateTaskStatusMutate } = useUpdateTaskStatusMutation();
  const { mutateAsync: requestReviewMutate } = useRequestReviewMutation(projectId, taskId);

  const handleAction = async () => {
    if (uiStatus === TASK_STATUS.REVIEW) {
      try {
        await requestReviewMutate();
        toast.success('재검토 요청이 완료되었습니다!', { position: 'top-center' });
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.type === ERROR.TASK.RE_REVIEW_COOLDOWN.type) {
            if (!reReviewRequestedAt) return;

            const availableAt = new Date(new Date(reReviewRequestedAt).getTime() + 10 * 60 * 1000);
            const remainingSeconds = getRemainingSeconds(availableAt);

            if (remainingSeconds > 0) {
              toast(
                <div className="flex flex-col items-center">
                  <MovingBoo size={24} />
                  <div className="text-center">
                    다음 재검토 요청 가능 시간까지
                    <br />
                    <strong>{formatSecondsMMSS(remainingSeconds)}</strong> 남았습니다.
                  </div>
                </div>,
                { position: 'top-center' },
              );
            }
            return;
          }
          toast.error(getErrorMessage(error));
        } else {
          toast.error('예상치 못한 오류가 발생했습니다.');
        }
      }
    } else {
      try {
        setUiStatus(TASK_STATUS.REVIEW);
        await updateTaskStatusMutate({ projectId, taskId, status: TASK_STATUS.REVIEW });
        toast.success('검토 요청이 완료되었습니다!', { position: 'top-center' });
      } catch (error) {
        if (error instanceof ApiError) toast.error(getErrorMessage(error));
        else toast.error('검토 요청 중 오류가 발생했습니다.');

        setUiStatus(taskStatus);
      }
    }
  };

  const handleCompleteTask = async () => {
    try {
      await updateTaskStatusMutate({ projectId, taskId, status: TASK_STATUS.DONE });
      setUiStatus(TASK_STATUS.DONE);
    } catch (error) {
      if (error instanceof ApiError) toast.error(getErrorMessage(error));
      else toast.error('알 수 없는 오류가 발생했습니다.');
    }
  };

  const getBadgeClass = () => {
    if (approvedCount >= requiredReviewerCount)
      return 'border-green-700 bg-green-100 text-green-700';
    if (uiStatus === TASK_STATUS.REVIEW)
      return 'border-boost-orange bg-boost-orange/20 text-boost-orange';
    return 'border-boost-blue bg-boost-blue/20 text-boost-blue';
  };

  return { uiStatus, approvedCount, handleAction, handleCompleteTask, getBadgeClass };
};
