import { useTagsQuery } from '@/features/tag/hooks/useTagsQuery';
import { useCreateTagMutation } from '@/features/tag/hooks/useCreateTagMutation';
import { useDeleteTagMutation } from '@/features/tag/hooks/useDeleteTagMutation';
import { useUpdateTagMutation } from '@/features/tag/hooks/useUpdateTagMutation';
import TagInput from '@/features/tag/components/TagInput/TagInput';
import type { Tag, TagList } from '@/features/tag/types/tagTypes';

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
      onError: () => {
        onChangeTags(previous);
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
          },
          onError: () => {
            onChangeTags(previous);
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
