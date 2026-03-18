import { forwardRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Pin } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import type { CommentUIType } from '@/features/comment/types/commentTypes';
import type { FileInfo } from '@/features/task-detail/types/taskDetailType';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';
import CommentActionsMenu from '@/features/task-detail/components/CommentSection/CommentList/CommentItemActions';
import CommentAuthorAvatar from '@/features/task-detail/components/CommentSection/CommentList/CommentAuthorAvatar';

interface CommentItemProps {
  comment: CommentUIType;
  onCommentEdit?: (comment: CommentUIType) => void;
  onCommentDelete?: (commentId: string) => void;
  onCommentSelect?: (fileInfo: FileInfo | null) => void;

  isEditing?: boolean;
  isSelected?: boolean;
  isPinHighlighted?: boolean;
}

const CommentItem = forwardRef<HTMLDivElement, CommentItemProps>(
  (
    {
      comment,
      onCommentEdit,
      onCommentDelete,
      onCommentSelect,
      isEditing,
      isSelected,
      isPinHighlighted,
    },
    ref,
  ) => {
    const { setActivePinCommentId, clearCurrentPin, closeCommentDrawer } = useTaskDetailStore(
      useShallow((s) => ({
        setActivePinCommentId: s.setActivePinCommentId,
        clearCurrentPin: s.clearCurrentPin,
        closeCommentDrawer: s.closeCommentDrawer,
      })),
    );

    const user = useAuthStore((s) => s.user);

    const isAnonymous = comment.isAnonymous;
    const isAuthor = user?.id === comment.authorInfo.memberId;

    const handleCommentItemClick = () => {
      onCommentSelect?.(comment.fileInfo ?? null);
      setActivePinCommentId(comment.commentId);
      clearCurrentPin();
      closeCommentDrawer();
    };

    return (
      <div ref={ref} className="flex py-2 sm:py-3">
        <div className="flex-1">
          <div
            onClick={handleCommentItemClick}
            className={cn(
              'rounded-xl px-3 py-2 sm:px-4 sm:py-3 shadow-sm relative transition-all duration-200 border bg-gray-200 border-gray-200',
              isEditing && 'bg-boost-blue/5 border-boost-blue/40',
              comment.fileInfo && 'cursor-pointer',
              isSelected && 'border border-boost-blue/60 bg-boost-blue/10',
              isPinHighlighted &&
                !isEditing &&
                comment.fileInfo &&
                'border-1 border-boost-yellow bg-boost-yellow/10',
            )}
          >
            <div className="flex items-center justify-between pb-2 sm:pb-3">
              <div className="flex items-center gap-1 sm:gap-2">
                <CommentAuthorAvatar
                  persona={comment.persona}
                  isAnonymous={comment.isAnonymous}
                  avatar={comment.authorInfo.avatar}
                  backgroundColor={comment.authorInfo.backgroundColor}
                  name={comment.authorInfo.name}
                />

                <span className="label1-bold sm:body2-bold text-gray-800 ">
                  {isAnonymous ? '익명' : comment.authorInfo.name}
                </span>

                {comment.isPinned && (
                  <Pin className="size-3 sm:size-4 text-boost-orange" aria-label="핀 댓글" />
                )}
              </div>

              <div className="flex items-center gap-1">
                <span className="label2-regular sm:label1-regular text-gray-500">
                  {comment.timeAgo}
                </span>

                {isAuthor && (
                  <CommentActionsMenu
                    onCommentEdit={() => onCommentEdit?.(comment)}
                    onCommentDelete={() => onCommentDelete?.(comment.commentId)}
                  />
                )}
              </div>
            </div>

            <p className="px-1 sm:px-2 label1-regular sm:body2-regular text-gray-800">
              {comment.content}
            </p>
          </div>
        </div>
      </div>
    );
  },
);

export default CommentItem;
