import TaskReviewActions from '@/features/task-detail/components/TaskDetailTopTab/TaskReviewActions';
import type { TaskDetail } from '@/features/task/types/task.domain.types';
import { Collapsible, CollapsibleContent } from '@/shared/components/shadcn/collapsible';
import { cn } from '@/shared/lib/utils';
interface TaskReviewActionCollapsibleProps {
  isReviewActionOpen: boolean;
  task: TaskDetail;
}
const TaskReviewActionCollapsible = ({
  isReviewActionOpen,
  task,
}: TaskReviewActionCollapsibleProps) => {
  return (
    <Collapsible open={isReviewActionOpen}>
      <CollapsibleContent forceMount>
        <div
          className={cn(
            'sm:hidden grid transition-[grid-template-rows] duration-300 ease-in-out',
            isReviewActionOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
        >
          <div className="overflow-hidden bg-gray-50">
            <div className="p-2">
              <TaskReviewActions task={task} />
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default TaskReviewActionCollapsible;
