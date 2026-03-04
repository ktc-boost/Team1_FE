import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';
import type { TaskDetail } from '@/features/task/types/taskTypes';
import { useAiTransformStore } from '@/features/ai-transform/store/useAiTransformStore';
import BackButton from '@/shared/components/ui/BackButton';
import { usePdfStore } from '@/features/task-detail/store/usePdfStore';
import { CheckCircle2, MessageSquare } from 'lucide-react';
import TaskReviewActions from '@/features/task-detail/components/TaskDetailTopTab/TaskReviewActions';
import { Button } from '@/shared/components/shadcn/button';
import { useShallow } from 'zustand/react/shallow';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/shadcn/tooltip';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { useEffect, useState } from 'react';

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
  const { resetAll, currentPin } = useTaskDetailStore(
    useShallow((s) => ({ resetAll: s.resetAll, currentPin: s.currentPin })),
  );
  const resetAiComment = useAiTransformStore((state) => state.reset);
  const resetPdf = usePdfStore((state) => state.resetPdf);
  const isMobile = useIsMobile();
  const [hintOpen, setHintOpen] = useState(false);

  useEffect(() => {
    if (!isMobile) return;
    if (!currentPin) {
      setHintOpen(false);
      return;
    }
    setHintOpen(true);
    const t = setTimeout(() => setHintOpen(false), 2000);
    return () => clearTimeout(t);
  }, [isMobile, currentPin]);

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
        <TooltipProvider delayDuration={0}>
          <Tooltip open={hintOpen}>
            <TooltipTrigger asChild>
              <Button onClick={onOpenComments} variant="ghost" className="relative">
                <MessageSquare className="size-5 transition-colors text-black" />
                {currentPin && (
                  <span className="absolute top-2 right-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-900 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-900"></span>
                  </span>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent className="sm:hidden" side="bottom">
              <p> 핀댓글 달기</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

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
