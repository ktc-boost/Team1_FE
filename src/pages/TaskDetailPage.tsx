import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import TaskDetailTopTab from '@/features/task-detail/components/TaskDetailTopTab/TaskDetailTopTab';
import { useTaskDetailQuery } from '@/features/task/hooks/query/useTaskDetailQuery';
import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';
import { extractPinsFromComments } from '@/features/comment/utils/commentUtils';
import FullPageLoader from '@/shared/components/ui/loading/FullPageLoader';
import { useCommentQuery } from '@/features/comment/hooks/useCommentQuery';
import TaskDetailInfoSection from '@/features/task-detail/components/TaskDetailInfoSection';
import TaskDetailCommentSection from '@/features/task-detail/components/TaskDetailCommentSection';
import TaskReviewActions from '@/features/task-detail/components/TaskDetailTopTab/TaskReviewActions';
import { cn } from '@/shared/lib/utils';
import { Collapsible, CollapsibleContent } from '@/shared/components/shadcn/collapsible';
import CommentDrawerMobile from '@/features/task-detail/components/CommentSection/CommentDrawerMobile';
const TaskDetailPage = () => {
  const { projectId, taskId } = useParams<{ projectId: string; taskId: string }>();
  const { data: comments = [] } = useCommentQuery(projectId!, taskId!);
  const { data: task, isLoading } = useTaskDetailQuery(projectId!, taskId!);
  const setPins = useTaskDetailStore((state) => state.setPins);

  const extractedPins = useMemo(() => extractPinsFromComments(comments), [comments]);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isReviewActionOpen, setIsReviewActionOpen] = useState(false);
  useEffect(() => {
    setPins(extractedPins);
  }, [extractedPins, setPins]);

  if (!projectId) return <div className="p-4">프로젝트 ID를 찾을 수 없습니다.</div>;
  if (!taskId) return <div className="p-4">태스크 ID를 찾을 수 없습니다.</div>;

  if (isLoading || !task) {
    return <FullPageLoader text="할 일 불러오는 중.." />;
  }
  return (
    <div className="flex flex-col h-screen">
      <TaskDetailTopTab
        task={task}
        onOpenComments={() => setIsCommentOpen(true)}
        onToggleReviewAction={() => setIsReviewActionOpen((v) => !v)}
      />
      <Collapsible open={isReviewActionOpen}>
        <CollapsibleContent forceMount>
          <div
            className={cn(
              'sm:hidden grid transition-[grid-template-rows] duration-300 ease-in-out',
              isReviewActionOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
            )}
          >
            <div className="overflow-hidden bg-gray-50 flex justify-center">
              <div className="p-2">
                <TaskReviewActions task={task} />
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="flex flex-1 overflow-hidden">
        <TaskDetailInfoSection task={task} taskId={taskId} />
        <TaskDetailCommentSection projectId={projectId!} taskId={taskId!} comments={comments} />
      </div>

      <div className="sm:hidden">
        <CommentDrawerMobile
          isCommentOpen={isCommentOpen}
          setIsCommentOpen={setIsCommentOpen}
          projectId={projectId}
          taskId={taskId}
          comments={comments}
        />{' '}
      </div>
    </div>
  );
};
export default TaskDetailPage;
