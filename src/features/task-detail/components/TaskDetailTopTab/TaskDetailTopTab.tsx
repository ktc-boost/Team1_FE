import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';
import type { TaskDetail } from '@/features/task/types/taskTypes';
import { useAiTransformStore } from '@/features/ai-transform/store/useAiTransformStore';
import BackButton from '@/shared/components/ui/BackButton';
import { usePdfStore } from '@/features/task-detail/store/usePdfStore';
import { MessageSquare } from 'lucide-react';
import TaskReviewActions from '@/features/task-detail/components/TaskDetailTopTab/TaskReviewActions';

interface TaskDetailTopTabProps {
  task: TaskDetail;
  onOpenComments?: () => void;
}

const TaskDetailTopTab = ({ task, onOpenComments }: TaskDetailTopTabProps) => {
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
      <div className="">
        <button
          onClick={() => onOpenComments?.()}
          className="sm:hidden relative text-sm right-2 px-3 py-1 bg-white"
        >
          <MessageSquare />
        </button>
        {}
      </div>

      <div className="hidden sm:flex">
        {task.requiredReviewerCount > 0 && <TaskReviewActions task={task} />}
      </div>
    </nav>
  );
};

export default TaskDetailTopTab;
