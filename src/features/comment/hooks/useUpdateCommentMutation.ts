import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentApi } from '@/features/comment/api/commentApi';
import type { CommentType } from '@/features/comment/types/commentTypes';
import { COMMENT_QUERY_KEYS } from '@/features/comment/api/commentQueryKey';
import { AxiosError } from 'axios';

export const useUpdateCommentMutation = (projectId: string, taskId: string) => {
  const queryClient = useQueryClient();
  const queryKey = COMMENT_QUERY_KEYS.list(projectId, taskId);

  return useMutation<
    CommentType,
    AxiosError,
    { commentId: string; updatedData: Partial<CommentType> },
    { previousComments?: CommentType[] }
  >({
    mutationFn: ({ commentId, updatedData }) => commentApi.updateComment(commentId, updatedData),

    onMutate: async ({ commentId, updatedData }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousComments = queryClient.getQueryData<CommentType[]>(queryKey);

      queryClient.setQueryData<CommentType[]>(queryKey, (old) => {
        if (!old) return old;
        return old.map((comment) => {
          if (comment.commentId !== commentId) return comment;

          const nextFileInfo = updatedData.fileInfo;
          return {
            ...comment,
            ...updatedData,
            ...(nextFileInfo ? { fileInfo: { ...(comment.fileInfo ?? {}), ...nextFileInfo } } : {}),
          };
        });
      });

      return { previousComments };
    },

    onError: (_error, _, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(queryKey, context.previousComments);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
