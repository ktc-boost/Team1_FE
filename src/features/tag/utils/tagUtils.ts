import tinycolor from 'tinycolor2';
import type { TaskDetail, TaskListItem } from '@/features/task/types/task.domain.types';
import type { Tag, TagList } from '@/features/tag/types/tagTypes';
import { BOARD } from '@/features/board/constants/board.domain.constants';
import { TASK_STATUS } from '@/features/task/constants/task.domain.constants';

export const getTagIds = (tags: TagList): string[] => tags.map((tag) => tag.tagId);

export const createTagObjects = (tagIds: string[]): TagList =>
  tagIds.map((id) => ({ tagId: id, name: '' }));

interface TagColorStyle {
  backgroundColor: string;
  color: string;
  borderColor?: string;
}

const tagColorMap: Record<string, TagColorStyle> = {
  검토필요: { backgroundColor: '#dcfce7', color: '#166534' },
  검토완료: { backgroundColor: '#dbeafe', color: '#1e40af' },
  마감일: { backgroundColor: '#dbeafe', color: '#1e40af' },
};

function stringToHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function hashToHue(hash: number): number {
  return Math.abs(hash) % 360;
}

export function generatePastelColor(tagName: string, withBorder = false): TagColorStyle {
  const hue = hashToHue(stringToHash(tagName));
  const baseColor = tinycolor({ h: hue, s: 0.3, l: 0.9 });

  const backgroundColor = baseColor.toHexString();
  const borderColor = withBorder ? tinycolor.mix(baseColor, '#000', 15).toHexString() : undefined;
  const color = baseColor.isLight()
    ? baseColor.darken(60).toHexString()
    : baseColor.lighten(60).toHexString();

  return { backgroundColor, color, borderColor };
}

export function getColorStyleForTag(tag: Tag | string, withBorder = false): TagColorStyle {
  const tagName = typeof tag === 'string' ? tag : tag.name;
  return tagColorMap[tagName] ?? generatePastelColor(tagName, withBorder);
}

export function generateTags(task: TaskDetail | TaskListItem): TagList {
  const tags: TagList = [];
  const hasReviewers = task.requiredReviewerCount && task.requiredReviewerCount > 0;

  if (BOARD.STATUS in task && hasReviewers) {
    if (task.status === TASK_STATUS.DONE) {
      tags.push({ tagId: 'system-review-done', name: '검토완료' });
    } else {
      tags.push({ tagId: 'system-review', name: '검토필요' });
    }
  }

  if (task.tags) tags.push(...task.tags);

  return tags;
}
