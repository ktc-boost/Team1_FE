import CommentList from '@/features/task-detail/components/CommentSection/CommentList/CommentList';
import CommentEditor from '@/features/task-detail/components/CommentSection/CommentEditor/CommentEditor';
import type { CommentUIType } from '@/features/comment/types/commentTypes';
import { useCommentActions } from '@/features/task-detail/hooks/domain/useCommentActions';

interface CommentSectionProps {
  projectId: string;
  taskId: string;
  comments: CommentUIType[];
}

const CommentSection = ({ projectId, taskId, comments }: CommentSectionProps) => {
  const { handleCommentSelect, handleCommentCreate, handleCommentUpdate, handleCommentDelete } =
    useCommentActions(projectId, taskId);

  return (
    <div className="bg-gray-100 border-none flex flex-col h-full relative">
      <h2 className="px-3 py-2.5 sm:px-4 sm:py-3 label1-bold sm:title2-bold border-b border-gray-300 text-gray-800">
        댓글 ({comments.length})
      </h2>
      <CommentList
        comments={comments}
        onCommentSelect={handleCommentSelect}
        onCommentDelete={handleCommentDelete}
      />

      <CommentEditor onCommentCreate={handleCommentCreate} onCommentUpdate={handleCommentUpdate} />
    </div>
  );
};

export default CommentSection;
