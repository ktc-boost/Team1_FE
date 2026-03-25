import { v4 as uuidv4 } from 'uuid';
import { isAxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TAG_QUERY_KEYS } from '@/features/tag/constants/tagQueryKeys';
import type { Tag, TagList, TagRequest } from '@/features/tag/types/tagTypes';
import { tagApi } from '@/features/tag/api/tagApi';

// 태그 생성
export const useCreateTagMutation = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation<Tag, Error, TagRequest, { previousTags: TagList; tempTag: Tag }>({
    mutationFn: (tagData) => tagApi.createTag(projectId, tagData.name),

    onMutate: async ({ name }) => {
      await queryClient.cancelQueries({ queryKey: TAG_QUERY_KEYS.project(projectId) });

      const previousTags =
        queryClient.getQueryData<TagList>(TAG_QUERY_KEYS.project(projectId)) ?? [];

      const tempTag: Tag = {
        tagId: `temp-${uuidv4()}`,
        name,
      };

      queryClient.setQueryData<TagList>(TAG_QUERY_KEYS.project(projectId), [
        tempTag,
        ...previousTags,
      ]);

      return { previousTags, tempTag };
    },

    onError: (error, _, context) => {
      if (context) {
        queryClient.setQueryData(TAG_QUERY_KEYS.project(projectId), context.previousTags);
      }

      if (isAxiosError(error) && error.response?.status === 409) {
        const existingTag: Tag = error.response.data;
        queryClient.setQueryData<TagList>(TAG_QUERY_KEYS.project(projectId), (old) => {
          const tags = old ?? [];
          return tags.some((t) => t.tagId === existingTag.tagId) ? tags : [existingTag, ...tags];
        });
        return;
      }
    },

    onSuccess: (createdTag, _, context) => {
      queryClient.setQueryData<TagList>(TAG_QUERY_KEYS.project(projectId), (old) => {
        const tags = old ?? [];
        return tags.map((tag) => (tag.tagId === context?.tempTag.tagId ? createdTag : tag));
      });
    },
  });
};
