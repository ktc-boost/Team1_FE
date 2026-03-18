import { useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';
import type { CommentUIType } from '@/features/comment/types/commentTypes';
import type { FileInfo } from '@/features/task-detail/types/taskDetailType';
import CommentItem from '@/features/task-detail/components/CommentSection/CommentList/CommentItem';

interface CommentListProps {
  comments: CommentUIType[];
  onCommentDelete: (id: string) => void;
  onCommentSelect: (fileInfo: FileInfo | null) => void;
}

const CommentList = ({ comments, onCommentDelete, onCommentSelect }: CommentListProps) => {
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

  const handleCommentEdit = (comment: CommentUIType) => {
    setEditingComment({
      id: comment.commentId,
      content: comment.content,
      isAnonymous: comment.isAnonymous,
      fileInfo: comment.fileInfo ?? null,
    });
  };

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
    <div ref={scrollRef} className="px-4 flex-1 overflow-y-auto pb-40">
      {comments.map((comment) => {
        const isCurrentEditing = editingComment?.id === comment.commentId;
        const isSelected = comment.commentId === selectedCommentId;
        const isPinned = comment.commentId === activePinCommentId;

        return (
          <CommentItem
            key={comment.commentId}
            ref={isPinned ? pinnedRef : null}
            comment={comment}
            isEditing={isCurrentEditing}
            isSelected={isSelected}
            isPinHighlighted={isPinned && !editingComment}
            onCommentEdit={handleCommentEdit}
            onCommentDelete={() => onCommentDelete(comment.commentId)}
            onCommentSelect={onCommentSelect}
          />
        );
      })}
    </div>
  );
};

export default CommentList;
