import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';
import { getErrorMessage } from '@/shared/error/utils/error.utils';
import { ApiError } from '@/shared/error/types/apiError.types';
import { useCreateCommentMutation } from '@/features/comment/hooks/useCreateCommentMutation';
import { useDeleteCommentMutation } from '@/features/comment/hooks/useDeleteCommentMutation';
import { useUpdateCommentMutation } from '@/features/comment/hooks/useUpdateCommentMutation';
import { useCommentSelect } from '@/features/task-detail/hooks/domain/useCommentSelect';
import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';
import type { FileInfo } from '@/features/task-detail/types/taskDetailType';
import { commentToast } from '@/features/task-detail/utils/toast/commentToast';
import { buildCreateCommentPayload, isBlank } from '@/features/task-detail/utils/commentPayload';

export const useCommentActions = (projectId: string, taskId: string) => {
  const { mutate: createComment } = useCreateCommentMutation(projectId, taskId);
  const { mutate: updateComment } = useUpdateCommentMutation(projectId, taskId);
  const { mutate: deleteComment } = useDeleteCommentMutation(projectId, taskId);

  const { commentSelect } = useCommentSelect(projectId, taskId);

  const { clearCurrentPin, currentPin, persona } = useTaskDetailStore(
    useShallow((s) => ({
      clearCurrentPin: s.clearCurrentPin,
      currentPin: s.currentPin,
      persona: s.persona,
    })),
  );

  const handleCommentSelect = (fileInfo: FileInfo | null) => {
    if (!fileInfo) return;
    commentSelect(fileInfo);
  };

  const handleCommentCreate = (data: { content: string; isAnonymous: boolean }) => {
    if (isBlank(data.content)) return commentToast.emptyContent();

    const payload = buildCreateCommentPayload({
      content: data.content,
      isAnonymous: data.isAnonymous,
      persona,
      currentPin,
    });

    createComment(
      { commentData: payload },
      {
        onSuccess: clearCurrentPin,
        onError: (error) => {
          if (error instanceof ApiError) toast.error(getErrorMessage(error));
          else toast.error('댓글 생성을 실패했어요.');
        },
      },
    );
  };

  const handleCommentUpdate = (
    commentId: string,
    data: { content: string; isAnonymous: boolean },
  ) => {
    if (isBlank(data.content)) return commentToast.emptyContent();

    updateComment(
      {
        commentId,
        updatedData: {
          content: data.content,
          isAnonymous: data.isAnonymous,
          fileInfo: currentPin,
        },
      },
      {
        onSuccess: () => {
          toast.success('댓글이 수정되었습니다.');
        },
        onError: (error) => {
          if (error instanceof ApiError) toast.error(getErrorMessage(error));
          else toast.error('댓글 수정을 실패했어요.');
        },
      },
    );
  };

  return {
    handleCommentSelect,
    handleCommentCreate,
    handleCommentUpdate,
    handleCommentDelete: deleteComment,
  };
};
