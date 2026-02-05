import { Calendar } from 'lucide-react';
import { Badge } from '@/shared/components/shadcn/badge';
import { getColorStyleForTag } from '@/features/tag/utils/tagUtils';
import { calculateDDay } from '@/shared/utils/dateUtils';
import ContentItem from '@/shared/components/ui/ContentItem';
import InfoCard from '@/shared/components/ui/InfoCard';

interface DueDateInfoProps {
  dueDate: string;
}

const DueDateInfo = ({ dueDate }: DueDateInfoProps) => {
  const tagStyle = getColorStyleForTag('마감일');

  return (
    <InfoCard>
      <ContentItem icon={Calendar} title="마감일">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
          <span className="label2-regular sm:body2-regular text-gray-700">{dueDate}</span>
          <Badge style={tagStyle} className="label2-regular sm:!body2-regular w-fit">
            {calculateDDay(dueDate, 'text')}
          </Badge>
        </div>
      </ContentItem>
    </InfoCard>
  );
};

export default DueDateInfo;
