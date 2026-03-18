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
import CommentDrawerMobile from '@/features/task-detail/components/CommentSection/CommentDrawerMobile';
import { useShallow } from 'zustand/react/shallow';
import TaskReviewActionCollapsible from '@/features/task-detail/components/TaskReviewActionCollapsible';
const TaskDetailPage = () => {
  const { projectId, taskId } = useParams<{ projectId: string; taskId: string }>();
  const { data: comments = [] } = useCommentQuery(projectId!, taskId!);
  const { data: task, isLoading } = useTaskDetailQuery(projectId!, taskId!);
  const { isCommentDrawerOpen, setCommentDrawerOpen, setPins } = useTaskDetailStore(
    useShallow((s) => ({
      isCommentDrawerOpen: s.isCommentDrawerOpen,
      setCommentDrawerOpen: s.setCommentDrawerOpen,
      setPins: s.setPins,
    })),
  );

  const extractedPins = useMemo(() => extractPinsFromComments(comments), [comments]);
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
        onOpenComments={() => setCommentDrawerOpen(true)}
        onToggleReviewAction={() => setIsReviewActionOpen((v) => !v)}
      />
      <TaskReviewActionCollapsible isReviewActionOpen={isReviewActionOpen} task={task} />

      <div className="flex flex-1 overflow-hidden">
        <TaskDetailInfoSection task={task} taskId={taskId} />
        <TaskDetailCommentSection projectId={projectId!} taskId={taskId!} comments={comments} />
      </div>

      <div className="sm:hidden">
        <CommentDrawerMobile
          isCommentOpen={isCommentDrawerOpen}
          setIsCommentOpen={setCommentDrawerOpen}
          projectId={projectId}
          taskId={taskId}
          comments={comments}
        />
      </div>
    </div>
  );
};
export default TaskDetailPage;
