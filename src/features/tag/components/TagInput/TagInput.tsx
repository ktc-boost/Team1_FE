import { Plus } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Input } from '@/shared/components/shadcn/input';
import { cn } from '@/shared/lib/utils';
import TagChip from '@/features/tag/components/TagChip';
import TagDropdownItem from '@/features/tag/components/TagInput/TagDropdownItem';
import TagEmptyState from '@/features/tag/components/TagInput/TagEmptyState';
import type { Tag, TagList } from '@/features/tag/types/tagTypes';

interface TagInputProps {
  tags: TagList;
  allTags: TagList;
  onAddTag: (tagName: string) => void;
  onRemoveTag: (tagId: string) => void;
  onSelectExistingTag: (tag: Tag) => void;
  onEditTag: (tagId: string, newName: string) => void;
  onDeleteProjectTag: (tagId: string) => void;
  disabled?: boolean;
}

const TagInput = ({
  tags,
  allTags,
  onAddTag,
  onRemoveTag,
  onSelectExistingTag,
  onEditTag,
  onDeleteProjectTag,
  disabled,
}: TagInputProps) => {
  const [tagInput, setTagInput] = useState('');
  const [editingTagId, setEditingTagId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isComposing, setIsComposing] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const normalizedInput = tagInput.trim().toLowerCase();
  const filteredTags = allTags.filter((t) => t.name.toLowerCase().includes(normalizedInput));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && normalizedInput && !isComposing) {
      e.preventDefault();
      const existing = allTags.find((t) => t.name.toLowerCase() === normalizedInput);

      if (existing) onSelectExistingTag(existing);
      else onAddTag(tagInput.trim());

      setTagInput('');
    } else if (e.key === 'Escape') {
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      const isInDropdown = target.closest('[data-radix-popper-content-wrapper]');
      if (isInDropdown) return;
      if (containerRef.current && !containerRef.current.contains(target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, []);

  const renderDropdownContent = () => {
    if (filteredTags.length > 0) {
      return filteredTags.map((tag) => (
        <TagDropdownItem
          key={tag.tagId}
          tag={tag}
          isSelected={tags.some((t) => t.tagId === tag.tagId)}
          editingTagId={editingTagId}
          editValue={editValue}
          setEditValue={setEditValue}
          setEditingTagId={setEditingTagId}
          onRemove={onRemoveTag}
          onSelect={(tag) => {
            onSelectExistingTag(tag);
            setTagInput('');
          }}
          onEdit={onEditTag}
          onDelete={onDeleteProjectTag}
        />
      ));
    } else if (tagInput) {
      return <TagEmptyState message={`${tagInput}에 대한 검색 결과가 없습니다`} />;
    } else {
      return <TagEmptyState message="태그를 검색하거나 새로 만드세요" />;
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="flex flex-wrap items-center gap-2 px-2 py-2 min-h-11 border border-gray-300 hover:border-gray-400 rounded-lg bg-white transition-all duration-200">
        {tags.map((tag) => (
          <TagChip key={tag.tagId} tag={tag} onRemove={onRemoveTag} />
        ))}

        <Input
          ref={inputRef}
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? '태그 입력 후 Enter' : ''}
          disabled={disabled}
          className="flex-1 min-w-[120px] h-8 border-none focus:ring-transparent label2-regular bg-transparent placeholder:text-gray-400"
        />
      </div>

      <div
        className={cn(
          'absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-sm max-h-50 overflow-auto z-50 transition-all duration-200',
          isFocused ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none',
        )}
      >
        {tagInput && !filteredTags.some((t) => t.name.toLowerCase() === normalizedInput) && (
          <div
            onClick={() => {
              onAddTag(tagInput.trim());
              setTagInput('');
            }}
            className="flex items-center gap-2 m-2 rounded-md px-3 py-2.5 hover:bg-blue-50 cursor-pointer transition-colors"
          >
            <Plus className="w-4 h-4 text-boost-blue-500" />
            <span className="label1-regular text-gray-700">
              새 태그 만들기: <span className="text-boost-blue">"{tagInput}"</span>
            </span>
          </div>
        )}
        {renderDropdownContent()}
      </div>
    </div>
  );
};

export default TagInput;
