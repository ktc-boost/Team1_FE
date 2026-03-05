import { useParams } from 'react-router-dom';
import { cn } from '@/shared/lib/utils';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { AssigneeActionButton } from '@/features/task-detail/components/TaskDetailTopTab/AssigneeActionButton';
import { ReviewerActionButton } from '@/features/task-detail/components/TaskDetailTopTab/ReviewerActionButton';
import { useAssigneeTask } from '@/features/task-detail/hooks/useAssigneeTask';
import { useReviewerTask } from '@/features/task-detail/hooks/useReviewerTask';
import type { TaskDetail } from '@/features/task/types/task.domain.types';
import { TASK_STATUS } from '@/features/task/constants/task.domain.constants';

interface TaskReviewActionsProps {
  task: TaskDetail;
}

const TaskReviewActions = ({ task }: TaskReviewActionsProps) => {
  const { projectId } = useParams<{ projectId: string }>();
  const currentUser = useAuthStore((state) => state.user);

  const isAssignee = task.assignees.some((a) => a.id === currentUser?.id);

  const assigneeTask = useAssigneeTask({
    projectId: projectId!,
    taskId: task.id,
    taskStatus: task.status,
    approvedCount: task.approvedCount,
    requiredReviewerCount: task.requiredReviewerCount,
    reReviewRequestedAt: task.reReviewRequestedAt,
  });

  const reviewerTask = useReviewerTask({
    projectId: projectId!,
    taskId: task.id,
    initialApprovedCount: task.approvedCount,
    requiredReviewerCount: task.requiredReviewerCount,
    initialApprovedByMe: task.approvedByMe,
  });

  return (
    <>
      {isAssignee ? (
        <div className="w-full flex justify-around gap-2 sm:gap-3 bg-transparent">
          <div
            className={cn(
              'w-[50%] sm:w-auto label1-regular rounded-full border h-9 px-4 py-2 flex items-center justify-center text-center',
              assigneeTask.getBadgeClass(),
            )}
          >
            받은 검토 수 {assigneeTask.approvedCount}/{task.requiredReviewerCount}
          </div>
          <AssigneeActionButton
            uiStatus={assigneeTask.uiStatus}
            approvedCount={assigneeTask.approvedCount}
            requiredReviewerCount={task.requiredReviewerCount}
            onAction={
              assigneeTask.approvedCount >= task.requiredReviewerCount
                ? assigneeTask.handleCompleteTask
                : assigneeTask.handleAction
            }
          />
        </div>
      ) : (
        assigneeTask.uiStatus === TASK_STATUS.REVIEW && (
          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className={cn(
                'w-full sm:w-auto label1-regular rounded-full border h-9 px-4 py-2 flex items-center justify-center text-center',
                reviewerTask.getBadgeClass(),
              )}
            >
              검토 완료 수 {reviewerTask.approvedCount}/{task.requiredReviewerCount}
            </div>
            <ReviewerActionButton
              isApprovedByMe={reviewerTask.isApprovedByMe}
              approvedCount={reviewerTask.approvedCount}
              requiredReviewerCount={task.requiredReviewerCount}
              onApprove={reviewerTask.handleApprove}
            />
          </div>
        )
      )}
    </>
  );
};

export default TaskReviewActions;
