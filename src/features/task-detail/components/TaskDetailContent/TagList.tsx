import { Tag } from 'lucide-react';
import TaskTags from '@/features/task/components/TaskCard/TaskTags';
import ContentItem from '@/shared/components/ui/ContentItem';
import type { TaskDetail } from '@/features/task/types/task.domain.types';
import InfoCard from '@/shared/components/ui/InfoCard';

interface TagListProps {
  task: TaskDetail;
}

const TagList = ({ task }: TagListProps) => (
  <InfoCard>
    <ContentItem icon={Tag} title="태그">
      <TaskTags task={task} />
    </ContentItem>
  </InfoCard>
);

export default TagList;
