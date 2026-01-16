import { useParams } from 'react-router-dom';
import { cn } from '@/shared/lib/utils';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';
import { AssigneeActionButton } from '@/features/task-detail/components/TaskDetailTopTab/AssigneeActionButton';
import { ReviewerActionButton } from '@/features/task-detail/components/TaskDetailTopTab/ReviewerActionButton';
import { useAssigneeTask } from '@/features/task-detail/hooks/useAssigneeTask';
import { useReviewerTask } from '@/features/task-detail/hooks/useReviewerTask';
import type { TaskDetail } from '@/features/task/types/taskTypes';
import { useAiTransformStore } from '@/features/ai-transform/store/useAiTransformStore';
import BackButton from '@/shared/components/ui/BackButton';
import { usePdfStore } from '@/features/task-detail/store/usePdfStore';

interface TaskDetailTopTabProps {
  task: TaskDetail;
}

const TaskDetailTopTab = ({ task }: TaskDetailTopTabProps) => {
  const { projectId } = useParams<{ projectId: string }>();

  const resetAll = useTaskDetailStore((state) => state.resetAll);
  const currentUser = useAuthStore((state) => state.user);
  const resetAiComment = useAiTransformStore((state) => state.reset);
  const resetPdf = usePdfStore((state) => state.resetPdf);
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
    <nav className="flex justify-between items-center w-full bg-gray-100 border-b border-gray-300 h-14 px-4">
      <div className="flex items-center gap-3 font-semibold text-lg">
        <BackButton
          onBack={() => {
            resetAll();
            resetAiComment();
            resetPdf();
          }}
        />

        {task.title}
      </div>

      {task.requiredReviewerCount > 0 && (
        <>
          {isAssignee ? (
            <div className="flex items-center gap-3 bg-transparent">
              <div
                className={cn(
                  'rounded-full border h-9 px-4 py-2 flex items-center text-sm font-medium',
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
            assigneeTask.uiStatus === 'REVIEW' && (
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'rounded-full border h-9 px-4 py-2 flex items-center text-sm font-medium',
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
      )}
    </nav>
  );
};

export default TaskDetailTopTab;
