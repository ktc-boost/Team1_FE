import { useState } from 'react';
import { useApproveTaskMutation } from '@/features/task/hooks/mutation/useApproveTaskMutation';

interface UseReviewerTaskProps {
  projectId: string;
  taskId: string;
  initialApprovedCount: number;
  requiredReviewerCount: number;
  initialApprovedByMe: boolean;
}

export const useReviewerTask = ({
  projectId,
  taskId,
  initialApprovedCount,
  requiredReviewerCount,
  initialApprovedByMe,
}: UseReviewerTaskProps) => {
  const [approvedCount, setApprovedCount] = useState(initialApprovedCount);
  const [isApprovedByMe, setIsApprovedByMe] = useState(initialApprovedByMe);

  const { mutateAsync: approveMutation } = useApproveTaskMutation(projectId, taskId);

  const handleApprove = async () => {
    if (isApprovedByMe) return;
    const updated = await approveMutation();
    setIsApprovedByMe(true);
    setApprovedCount(updated.approvedCount);
  };

  const getBadgeClass = () => {
    if (approvedCount >= requiredReviewerCount)
      return 'border-green-700 bg-green-100 text-green-700';
    return 'border-boost-blue bg-boost-blue/20 text-boost-blue';
  };

  return { approvedCount, isApprovedByMe, handleApprove, getBadgeClass };
};
