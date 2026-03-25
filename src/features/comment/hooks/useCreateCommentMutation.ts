import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentApi, type CreateCommentRequest } from '@/features/comment/api/commentApi';
import { v4 as uuidv4 } from 'uuid';
import type { CommentType } from '@/features/comment/types/commentTypes';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { COMMENT_QUERY_KEYS } from '@/features/comment/api/commentQueryKey';
import toast from 'react-hot-toast';

// 댓글 생성
export const useCreateCommentMutation = (projectId: string, taskId: string) => {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const queryKey = COMMENT_QUERY_KEYS.list(projectId, taskId);

  return useMutation<
    CommentType,
    Error,
    { commentData: CreateCommentRequest },
    { previous?: CommentType[]; queryKey: string[]; tempId: string }
  >({
    onMutate: async ({ commentData }) => {
      await queryClient.cancelQueries({ queryKey });

      const previous = queryClient.getQueryData<CommentType[]>(queryKey) ?? [];
      const tempId = `temp-${uuidv4()}`;
      const now = new Date().toISOString();
      const tempComment: CommentType = {
        commentId: tempId,
        ...commentData,
        authorInfo: {
          memberId: user?.id ?? 'unknown',
          name: commentData.isAnonymous ? '익명' : (user?.name ?? '사용자'),
          avatar: commentData.isAnonymous ? 'default' : (user?.avatar ?? 'default'),
          backgroundColor: commentData.isAnonymous ? '' : (user?.backgroundColor ?? ''),
        },
        createdAt: now,
        updatedAt: now,
        isAnonymous: commentData.isAnonymous,
        persona: commentData.persona,
      };

      queryClient.setQueryData<CommentType[]>(queryKey, [...previous, tempComment]);
      return { previous, queryKey: [...queryKey], tempId };
    },

    mutationFn: async ({ commentData }) => {
      const res = await commentApi.createComment(projectId, taskId, commentData);
      const formatted: CommentType = {
        commentId: res.commentId,
        content: res.content,
        persona: res.persona,
        isAnonymous: res.isAnonymous,
        fileInfo: res.fileInfo,
        authorInfo: {
          memberId: res.authorInfo.memberId,
          name: res.authorInfo.name,
          avatar: res.authorInfo.avatar,
          backgroundColor: res.authorInfo.backgroundColor,
        },
        createdAt: res.createdAt,
        updatedAt: res.updatedAt,
      };
      return formatted;
    },

    onSuccess: (newComment, _vars, context) => {
      if (!context) return;
      queryClient.setQueryData<CommentType[]>(context.queryKey, (prev = []) =>
        prev.map((c) => (c.commentId === context.tempId ? newComment : c)),
      );
      window.gtag('event', 'send_comment', {
        project_id: projectId,
        task_id: taskId,
        comment_id: newComment.commentId,
      });

      if (newComment.fileInfo) {
        window.gtag('event', 'send_pin_comment', {
          project_id: projectId,
          task_id: taskId,
          comment_id: newComment.commentId,
        });
      }
      queryClient.invalidateQueries({ queryKey: context.queryKey });
    },

    onError: (_err, _vars, context) => {
      if (!context) return;
      toast.error('댓글 등록에 실패했습니다');
      queryClient.setQueryData<CommentType[]>(context.queryKey, context.previous ?? []);
    },
  });
};
