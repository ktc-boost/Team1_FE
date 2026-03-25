import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { TagList } from '@/features/tag/types/tagTypes';
import { tagApi } from '@/features/tag/api/tagApi';
import { TAG_QUERY_KEYS } from '@/features/tag/constants/tagQueryKeys';

// 태그 삭제
export const useDeleteTagMutation = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation<{ success: boolean }, Error, string, { previousTags: TagList }>({
    mutationFn: (tagId) => tagApi.deleteTag(projectId, tagId),

    onMutate: async (tagId) => {
      await queryClient.cancelQueries({ queryKey: TAG_QUERY_KEYS.project(projectId) });

      const previousTags =
        queryClient.getQueryData<TagList>(TAG_QUERY_KEYS.project(projectId)) ?? [];

      queryClient.setQueryData<TagList>(
        TAG_QUERY_KEYS.project(projectId),
        previousTags.filter((tag) => tag.tagId !== tagId),
      );

      return { previousTags };
    },

    onError: (_, __, context) => {
      if (context) {
        queryClient.setQueryData(TAG_QUERY_KEYS.project(projectId), context.previousTags);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TAG_QUERY_KEYS.project(projectId) });
    },
  });
};
