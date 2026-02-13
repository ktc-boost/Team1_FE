import type { CommentUIType } from '@/features/comment/types/commentTypes';
import CommentSection from '@/features/task-detail/components/CommentSection/CommentSection';

interface TaskDetailCommentSectionProps {
  projectId: string;
  taskId: string;
  comments: CommentUIType[];
}

const TaskDetailCommentSection = ({
  projectId,
  taskId,
  comments,
}: TaskDetailCommentSectionProps) => {
  return (
    <aside className="hidden sm:flex w-4/10 bg-gray-100 border-l border-gray-300 flex-col overflow-hidden">
      <section id="comment" className="flex-1 overflow-y-auto">
        <CommentSection projectId={projectId} taskId={taskId} comments={comments} />
      </section>
    </aside>
  );
};
export default TaskDetailCommentSection;
