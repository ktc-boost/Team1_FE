import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';
import type { TaskDetail } from '@/features/task/types/taskTypes';
import { useAiTransformStore } from '@/features/ai-transform/store/useAiTransformStore';
import BackButton from '@/shared/components/ui/BackButton';
import { usePdfStore } from '@/features/task-detail/store/usePdfStore';
import { CheckCircle2, MessageSquare } from 'lucide-react';
import TaskReviewActions from '@/features/task-detail/components/TaskDetailTopTab/TaskReviewActions';
import { Button } from '@/shared/components/shadcn/button';

interface TaskDetailTopTabProps {
  task: TaskDetail;
  onOpenComments?: () => void;
  onToggleReviewAction?: () => void;
}

const TaskDetailTopTab = ({
  task,
  onOpenComments,
  onToggleReviewAction,
}: TaskDetailTopTabProps) => {
  const resetAll = useTaskDetailStore((state) => state.resetAll);
  const resetAiComment = useAiTransformStore((state) => state.reset);
  const resetPdf = usePdfStore((state) => state.resetPdf);

  return (
    <nav className="flex justify-between items-center w-full bg-gray-100 border-b border-gray-300 h-14 px-4">
      <div className="subtitle2-bold sm:title1-bold flex items-center gap-3">
        <BackButton
          onBack={() => {
            resetAll();
            resetAiComment();
            resetPdf();
          }}
        />

        {task.title}
      </div>
      <div className="sm:hidden flex gap-2">
        <Button onClick={onOpenComments} variant="ghost">
          <MessageSquare className="size-5" />
        </Button>

        <Button onClick={onToggleReviewAction} variant="ghost">
          <CheckCircle2 className="size-5" />
        </Button>
      </div>

      <div className="hidden sm:flex">
        {task.requiredReviewerCount > 0 && <TaskReviewActions task={task} />}
      </div>
    </nav>
  );
};

export default TaskDetailTopTab;
