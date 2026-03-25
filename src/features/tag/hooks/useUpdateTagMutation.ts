import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Tag, TagList } from '@/features/tag/types/tagTypes';
import { tagApi } from '@/features/tag/api/tagApi';
import { TAG_QUERY_KEYS } from '@/features/tag/constants/tagQueryKeys';

// 태그 수정
export const useUpdateTagMutation = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation<Tag, Error, { tagId: string; name: string }, { previousTags: TagList }>({
    mutationFn: ({ tagId, name }) => tagApi.updateTag(projectId, tagId, name),

    onMutate: async ({ tagId, name }) => {
      await queryClient.cancelQueries({ queryKey: TAG_QUERY_KEYS.project(projectId) });

      const previousTags =
        queryClient.getQueryData<TagList>(TAG_QUERY_KEYS.project(projectId)) ?? [];

      queryClient.setQueryData<TagList>(
        TAG_QUERY_KEYS.project(projectId),
        previousTags.map((tag) => (tag.tagId === tagId ? { ...tag, name } : tag)),
      );

      return { previousTags };
    },

    onError: (_, __, context) => {
      if (context) {
        queryClient.setQueryData(TAG_QUERY_KEYS.project(projectId), context.previousTags);
      }
    },

    onSuccess: (updatedTag) => {
      queryClient.setQueryData<TagList>(TAG_QUERY_KEYS.project(projectId), (old = []) =>
        old.map((tag) => (tag.tagId === updatedTag.tagId ? updatedTag : tag)),
      );
    },
  });
};
