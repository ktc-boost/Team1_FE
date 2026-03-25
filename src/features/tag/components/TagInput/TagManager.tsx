import { useTagsQuery } from '@/features/tag/hooks/useTagsQuery';
import { useCreateTagMutation } from '@/features/tag/hooks/useCreateTagMutation';
import { useDeleteTagMutation } from '@/features/tag/hooks/useDeleteTagMutation';
import { useUpdateTagMutation } from '@/features/tag/hooks/useUpdateTagMutation';
import TagInput from '@/features/tag/components/TagInput/TagInput';
import type { Tag, TagList } from '@/features/tag/types/tagTypes';
import { ApiError } from '@/shared/error/types/apiError.types';
import { getErrorMessage } from '@/shared/error/utils/error.utils';
import toast from 'react-hot-toast';

interface TagManagerProps {
  projectId: string;
  selectedTags: TagList;
  onChangeTags: (tags: TagList) => void;
}

const TagManager = ({ projectId, selectedTags, onChangeTags }: TagManagerProps) => {
  const { data: allTags = [] } = useTagsQuery(projectId);
  const { mutate: createTagMutation } = useCreateTagMutation(projectId);
  const { mutate: deleteTagMutation } = useDeleteTagMutation(projectId);
  const { mutate: updateTagMutation } = useUpdateTagMutation(projectId);

  const handleAddTag = (tagName: string) => {
    const trimmedName = tagName.trim();
    if (!trimmedName) return;

    if (selectedTags.some((t) => t.name === trimmedName)) return;

    const existingTag = allTags.find((t) => t.name === trimmedName);
    if (existingTag) {
      handleSelectExistingTag(existingTag);
      return;
    }

    createTagMutation(
      { name: trimmedName },
      {
        onSuccess: (createdTag) => {
          onChangeTags([...selectedTags, createdTag]);
        },
        onError: (error) => {
          if (error instanceof ApiError) toast.error(getErrorMessage(error));
          else toast.error('태그 생성을 실패했어요.');
        },
      },
    );
  };

  const handleRemoveTag = (tagId: string) => {
    const updated = selectedTags.filter((t) => t.tagId !== tagId);
    onChangeTags(updated);
  };

  const handleDeleteTagFromProject = (tagId: string) => {
    const previous = [...selectedTags];
    handleRemoveTag(tagId);
    deleteTagMutation(tagId, {
      onSuccess: () => {
        toast.success('태그가 삭제되었습니다.');
      },
      onError: (error) => {
        onChangeTags(previous);
        if (error instanceof ApiError) toast.error(getErrorMessage(error));
        else toast.error('태그 삭제를 실패했어요.');
      },
    });
  };

  const handleEditTag = (tagId: string, newName: string) => {
    const previous = [...selectedTags];
    const updated = selectedTags.map((t) => (t.tagId === tagId ? { ...t, name: newName } : t));
    onChangeTags(updated);

    if (!tagId.startsWith('temp-')) {
      updateTagMutation(
        { tagId, name: newName },
        {
          onSuccess: (serverTag) => {
            onChangeTags(selectedTags.map((t) => (t.tagId === serverTag.tagId ? serverTag : t)));
            toast.success('태그가 수정되었습니다.');
          },
          onError: (error) => {
            onChangeTags(previous);
            if (error instanceof ApiError) toast.error(getErrorMessage(error));
            else toast.error('태그 수정을 실패했어요.');
          },
        },
      );
    }
  };

  const handleSelectExistingTag = (tag: Tag) => {
    if (!selectedTags.some((t) => t.tagId === tag.tagId)) {
      const updated = [...selectedTags, tag];
      onChangeTags(updated);
    }
  };

  return (
    <TagInput
      tags={selectedTags}
      allTags={allTags}
      onAddTag={handleAddTag}
      onRemoveTag={handleRemoveTag}
      onSelectExistingTag={handleSelectExistingTag}
      onEditTag={handleEditTag}
      onDeleteProjectTag={handleDeleteTagFromProject}
    />
  );
};

export default TagManager;
