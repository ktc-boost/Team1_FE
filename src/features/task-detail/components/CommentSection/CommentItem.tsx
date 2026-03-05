import { forwardRef } from 'react';
import { cn } from '@/shared/lib/utils';
import type { CommentUIType } from '@/features/comment/types/commentTypes';
import type { FileInfo } from '@/features/task-detail/types/taskDetailType';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { CommentActionsMenu } from '@/features/task-detail/components/CommentSection/CommentActionsMenu';
import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';
import { useShallow } from 'zustand/react/shallow';
import { AuthorAvatar } from '@/features/task-detail/components/CommentSection/AuthorAvatar';
import { Pin } from 'lucide-react';

interface CommentItemProps {
  comment: CommentUIType;
  onEdit?: (comment: CommentUIType) => void;
  onDelete?: (commentId: string) => void;
  onSelectPin?: (fileInfo: FileInfo | null) => void;

  isEditing?: boolean;
  isSelected?: boolean;
  isPinHighlighted?: boolean;
}

const CommentItem = forwardRef<HTMLDivElement, CommentItemProps>(
  ({ comment, onEdit, onDelete, onSelectPin, isEditing, isSelected, isPinHighlighted }, ref) => {
    const { setActivePinCommentId, clearCurrentPin } = useTaskDetailStore(
      useShallow((s) => ({
        setActivePinCommentId: s.setActivePinCommentId,
        clearCurrentPin: s.clearCurrentPin,
      })),
    );
    const user = useAuthStore((s) => s.user);

    const isAnonymous = comment.isAnonymous;
    const isAuthor = user?.id === comment.authorInfo.memberId;

    return (
      <div ref={ref} className="flex py-2 sm:py-3">
        <div className="flex-1">
          <div
            onClick={() => {
              onSelectPin?.(comment.fileInfo ?? null);
              setActivePinCommentId(comment.commentId);
              clearCurrentPin();
            }}
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
                <AuthorAvatar
                  persona={comment.persona}
                  isAnonymous={comment.isAnonymous}
                  avatar={comment.authorInfo.avatar}
                  backgroundColor={comment.authorInfo.backgroundColor}
                  name={comment.authorInfo.name}
                />
                <span className="label2-bold sm:label1-bold text-gray-800">
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
                    onEdit={() => onEdit?.(comment)}
                    onDelete={() => onDelete?.(comment.commentId)}
                  />
                )}
              </div>
            </div>

            <p className="px-1 sm:px-2 label2-regular sm:label1-regular text-gray-800">
              {comment.content}
            </p>
          </div>
        </div>
      </div>
    );
  },
);

export default CommentItem;
