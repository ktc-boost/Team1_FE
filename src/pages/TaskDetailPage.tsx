import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import TaskDetailTopTab from '@/features/task-detail/components/TaskDetailTopTab/TaskDetailTopTab';
import { useTaskDetailQuery } from '@/features/task/hooks/query/useTaskDetailQuery';
import type { CommentUIType } from '@/features/comment/types/commentTypes';
import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';
import TaskDetailLeftPane from '@/features/task-detail/components/TaskDetailLeftPane';
import { extractPinsFromComments } from '@/features/comment/utils/commentUtils';
import TaskDetailRightPane from '@/features/task-detail/components/TaskDetailRightPane';
import FullPageLoader from '@/shared/components/ui/loading/FullPageLoader';

const TaskDetailPage = () => {
  const { projectId, taskId } = useParams<{ projectId: string; taskId: string }>();
  const { data: task, isLoading } = useTaskDetailQuery(projectId!, taskId!);
  const { setPins } = useTaskDetailStore();

  const handleCommentsFetched = useCallback(
    (comments: CommentUIType[]) => {
      const extractedPins = extractPinsFromComments(comments);
      setPins(extractedPins);
    },
    [setPins],
  );
  if (!projectId) return <div className="p-4">프로젝트 ID를 찾을 수 없습니다.</div>;
  if (!taskId) return <div className="p-4">태스크 ID를 찾을 수 없습니다.</div>;

  if (isLoading || !task) {
    return <FullPageLoader text="할 일 불러오는 중.." />;
  }

  return (
    <div className="flex flex-col h-screen">
      <TaskDetailTopTab task={task} />
      <div className="flex flex-1 overflow-hidden">
        <TaskDetailLeftPane task={task} taskId={taskId} />
        <TaskDetailRightPane
          projectId={projectId}
          taskId={taskId}
          onCommentsFetched={handleCommentsFetched}
        />
      </div>
    </div>
  );
};

export default TaskDetailPage;
