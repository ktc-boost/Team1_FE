import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tag as TagIcon } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Input } from '@/shared/components/shadcn/input';
import { Badge } from '@/shared/components/shadcn/badge';
import { Checkbox } from '@/shared/components/shadcn/checkbox';
import { useTagFilterStore } from '@/features/tag/store/useTagFilterStore';
import { useTagsQuery } from '@/features/tag/hooks/useTagsQuery';
import { getColorStyleForTag } from '@/features/tag/utils/tagUtils';
import TagChip from '@/features/tag/components/TagChip';
import type { TagResponse } from '@/features/tag/types/tagTypes';

const TagSearchInput = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { data: allTags = [] } = useTagsQuery(projectId!);

  const selectedTags = useTagFilterStore((s) => s.selectedTags);
  const addTag = useTagFilterStore((s) => s.addTag);
  const removeTag = useTagFilterStore((s) => s.removeTag);

  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const normalizedInput = input.trim().toLowerCase();
  const filteredTags = allTags.filter((t) => t.name.toLowerCase().includes(normalizedInput));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    e.preventDefault();
    const match = allTags.find((t) => t.name.toLowerCase() === normalizedInput);

    if (!match) return;

    const isSelected = selectedTags.some((t) => t.tagId === match.tagId);

    if (isSelected) removeTag(match.tagId);
    else addTag(match);

    setInput('');
    inputRef.current?.focus();
  };

  const handleTagClick = (tag: TagResponse) => {
    const isSelected = selectedTags.some((t) => t.tagId === tag.tagId);

    if (isSelected) removeTag(tag.tagId);
    else addTag(tag);

    setInput('');
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleClickOutside = (e: PointerEvent) => {
      const target = e.target as HTMLElement;

      if (target.closest('[data-radix-popper-content-wrapper]')) return;

      if (containerRef.current && !containerRef.current.contains(target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, []);

  const isTagSelected = (tagId: string) => selectedTags.some((t) => t.tagId === tagId);

  return (
    <div ref={containerRef} className="relative w-[200px] sm:w-[300px]">
      <div className="flex h-10 w-full items-center rounded-lg border border-gray-300 px-3 transition-colors duration-300 hover:border-gray-400 focus-within:border-gray-500">
        <TagIcon className="mr-2 h-4.5 w-4.5 shrink-0 text-gray-400" />
        <div className="flex flex-1 items-center gap-2 overflow-x-auto scrollbar-hide">
          {selectedTags.map((tag) => (
            <TagChip key={tag.tagId} tag={tag} onRemove={removeTag} />
          ))}

          <Input
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handleEnterKey}
            placeholder={selectedTags.length === 0 ? '태그 검색' : ''}
            className="h-8 min-w-[120px] flex-1 border-none bg-transparent label2-regular placeholder:text-gray-400 placeholder:label1-regular focus:ring-transparent"
          />
        </div>
      </div>

      <div
        className={cn(
          'lg:absolute left-0 right-0 top-full z-50 mt-2 max-h-52 overflow-y-auto rounded-md border border-gray-200 bg-white lg:shadow-sm transition-[opacity,transform] duration-300',
          'opacity-100 translate-y-0',
          !isFocused && 'lg:pointer-events-none lg:-translate-y-2 lg:opacity-0',
        )}
      >
        {filteredTags.length > 0 ? (
          filteredTags.map((tag) => {
            const selected = isTagSelected(tag.tagId);
            const tagStyle = getColorStyleForTag(tag);

            return (
              <div
                key={tag.tagId}
                onClick={() => handleTagClick(tag)}
                className="flex cursor-pointer items-center gap-3 px-3 py-2 transition-colors hover:bg-gray-50"
              >
                <Checkbox
                  checked={selected}
                  tabIndex={-1}
                  className="data-[state=checked]:border-boost-blue data-[state=checked]:bg-boost-blue"
                />
                <Badge
                  className="whitespace-normal break-words px-3 py-1 shadow-sm max-w-30 sm:max-w-40 md:max-w-50 lg:max-w-60"
                  style={tagStyle}
                >
                  <span className="truncate">{tag.name}</span>
                </Badge>
              </div>
            );
          })
        ) : input ? (
          <div className="p-3 label1-regular text-gray-500">
            {`"${input}"에 대한 검색 결과가 없습니다.`}
          </div>
        ) : (
          <div className="p-3 label1-regular text-gray-500">태그가 존재하지 않아요!</div>
        )}
      </div>
    </div>
  );
};

export default TagSearchInput;
