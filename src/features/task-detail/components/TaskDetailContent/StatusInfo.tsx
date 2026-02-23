import type { TaskStatus } from '@/features/task/types/task.domain.types';
import { getTitleByStatus } from '@/features/board/utils/boardUtils';
import InfoCard from '@/shared/components/ui/InfoCard';
import { Loader } from 'lucide-react';
import ContentItem from '@/shared/components/ui/ContentItem';

interface StatusInfoProps {
  status: TaskStatus;
}

const StatusInfo = ({ status }: StatusInfoProps) => {
  return (
    <InfoCard>
      <ContentItem icon={Loader} title="진행상태" />
      <div className="label2-regular p-2 py-1 mt-2 rounded-md w-fit shadow-sm bg-boost-orange text-white">
        {getTitleByStatus(status)}
      </div>
    </InfoCard>
  );
};

export default StatusInfo;
