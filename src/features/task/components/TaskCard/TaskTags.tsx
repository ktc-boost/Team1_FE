import {
  generateTags,
  getColorStyleForTag,
  generatePastelColor,
} from '@/features/tag/utils/tagUtils';
import { Badge } from '@/shared/components/shadcn/badge';
import type { TaskDetail, TaskListItem } from '@/features/task/types/taskTypes';

interface TaskTagsProps {
  task: TaskDetail | TaskListItem;
  projectName?: string;
}

const TaskTags = ({ task, projectName }: TaskTagsProps) => {
  const tags = generateTags(task);
  const projectTagStyle = projectName ? generatePastelColor(projectName, true) : null;

  return (
    <div className="flex flex-wrap gap-1 m-1">
      {/* 프로젝트 이름 태그 */}
      {projectName && projectTagStyle && (
        <Badge
          key={projectName}
          className="rounded-full max-w-34 pt-1"
          style={{
            ...projectTagStyle,
            border: `1px solid ${projectTagStyle.borderColor}`,
          }}
        >
          <span className="truncate">{projectName}</span>
        </Badge>
      )}

      {/* 기존 태그 */}
      {tags.map((tag) => (
        <Badge key={tag.tagId} style={getColorStyleForTag(tag)} className="max-w-34">
          <span className="truncate">{tag.name}</span>
        </Badge>
      ))}
    </div>
  );
};

export default TaskTags;
