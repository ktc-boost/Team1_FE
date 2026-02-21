import { useEffect, useRef } from 'react';
import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';
import type { CommentUIType } from '@/features/comment/types/commentTypes';
import type { FileInfo } from '@/features/task-detail/types/taskDetailType';
import { useShallow } from 'zustand/react/shallow';
import CommentItem from '@/features/task-detail/components/CommentSection/CommentItem';

interface CommentListProps {
  comments: CommentUIType[];
  onDelete: (id: string) => void;
  onSelectPin: (fileInfo: FileInfo | null) => void;
}

const CommentList = ({ comments, onDelete, onSelectPin }: CommentListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement | null>(null);

  const { activePinCommentId, selectedCommentId, editingComment, setEditingComment } =
    useTaskDetailStore(
      useShallow((s) => ({
        activePinCommentId: s.activePinCommentId,
        selectedCommentId: s.selectedCommentId,
        editingComment: s.editingComment,
        setEditingComment: s.setEditingComment,
      })),
    );
  useEffect(() => {
    if (!activePinCommentId) return;

    if (pinnedRef.current) {
      pinnedRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [activePinCommentId]);

  useEffect(() => {
    if (scrollRef.current && !activePinCommentId) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [comments, activePinCommentId]);

  return (
    <div ref={scrollRef} className="px-4 bg-red-300 flex-1 overflow-y-auto pb-40">
      {comments.map((comment) => (
        <CommentItem
          key={comment.commentId}
          ref={comment.commentId === activePinCommentId ? pinnedRef : null}
          comment={comment}
          isEditing={editingComment?.id === comment.commentId}
          isSelected={comment.commentId === selectedCommentId}
          isPinHighlighted={comment.commentId === activePinCommentId && !editingComment}
          onEdit={() =>
            setEditingComment({
              id: comment.commentId,
              content: comment.content,
              isAnonymous: comment.isAnonymous,
              fileInfo: comment.fileInfo ?? null,
            })
          }
          onDelete={() => onDelete(comment.commentId)}
          onSelectPin={onSelectPin}
        />
      ))}
    </div>
  );
};

export default CommentList;
