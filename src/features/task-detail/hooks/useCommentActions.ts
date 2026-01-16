import { useCreateCommentMutation } from '@/features/comment/hooks/useCreateCommentMutation';
import { useDeleteCommentMutation } from '@/features/comment/hooks/useDeleteCommentMutation';
import { useUpdateCommentMutation } from '@/features/comment/hooks/useUpdateCommentMutation';
import { useCommentSelect } from '@/features/task-detail/hooks/useCommentSelect';
import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';
import type { FileInfo } from '@/features/task-detail/types/taskDetailType';
import { commentToast } from '@/features/task-detail/utils/toast/commentToast';
import { buildCreateCommentPayload, isBlank } from '@/features/task-detail/utils/commentPayload';
import { useTaskDetailQuery } from '@/features/task/hooks/useTaskDetailQuery';
import { useShallow } from 'zustand/react/shallow';

export const useCommentActions = (projectId: string, taskId: string) => {
  const { mutate: createComment } = useCreateCommentMutation(projectId, taskId);
  const { mutate: updateComment } = useUpdateCommentMutation(projectId, taskId);
  const { mutate: deleteComment } = useDeleteCommentMutation(projectId, taskId);

  const { data: task } = useTaskDetailQuery(projectId, taskId);
  const { pins, clearCurrentPin, currentPin, persona } = useTaskDetailStore(
    useShallow((s) => ({
      pins: s.pins,
      clearCurrentPin: s.clearCurrentPin,
      currentPin: s.currentPin,
      persona: s.persona,
    })),
  );
  const { commentSelect } = useCommentSelect();

  const handlePinClick = (fileInfo: FileInfo | null) => {
    if (!fileInfo || !task?.files) return;
    commentSelect(fileInfo, task.files, pins);
  };

  const handleCreate = (data: { content: string; isAnonymous: boolean }) => {
    if (isBlank(data.content)) return commentToast.emptyContent();

    const payload = buildCreateCommentPayload({
      content: data.content,
      isAnonymous: data.isAnonymous,
      persona,
      currentPin,
    });

    createComment({ commentData: payload }, { onSuccess: clearCurrentPin });
  };

  const handleUpdate = (commentId: string, data: { content: string; isAnonymous: boolean }) => {
    if (isBlank(data.content)) return commentToast.emptyContent();

    updateComment({
      commentId,
      updatedData: {
        content: data.content,
        isAnonymous: data.isAnonymous,
        fileInfo: currentPin,
      },
    });
  };

  return { handlePinClick, handleCreate, handleUpdate, handleDelete: deleteComment };
};
