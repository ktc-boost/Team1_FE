import CommentList from '@/features/task-detail/components/CommentSection/CommentList';
import CommentEditor from '@/features/task-detail/components/CommentSection/CommentEditor';
import type { CommentUIType } from '@/features/comment/types/commentTypes';
import { useCommentActions } from '@/features/task-detail/hooks/useCommentActions';

interface CommentSectionProps {
  projectId: string;
  taskId: string;
  comments: CommentUIType[];
}

const CommentSection = ({ projectId, taskId, comments }: CommentSectionProps) => {
  const { handlePinClick, handleCreate, handleUpdate, handleDelete } = useCommentActions(
    projectId,
    taskId,
  );

  return (
    <div className="bg-gray-100 border-none flex flex-col h-full relative">
      <h2 className="px-3 py-2.5 sm:px-4 sm:py-3 label1-bold sm:title2-bold border-b border-gray-300 text-gray-800">
        댓글 ({comments.length})
      </h2>
      <CommentList comments={comments} onSelectPin={handlePinClick} onDelete={handleDelete} />

      <CommentEditor onCreate={handleCreate} onUpdate={handleUpdate} />
    </div>
  );
};

export default CommentSection;
