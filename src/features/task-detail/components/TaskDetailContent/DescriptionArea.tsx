import ContentItem from '@/shared/components/ui/ContentItem';
import InfoCard from '@/shared/components/ui/InfoCard';
import { FileText } from 'lucide-react';

interface DescriptionAreaProps {
  description: string;
}

const DescriptionArea = ({ description }: DescriptionAreaProps) => {
  return (
    <InfoCard className="flex-1 flex flex-col overflow-hidden">
      <ContentItem icon={FileText} title="작업내용" />
      <div className="flex-1 overflow-auto rounded-lg p-3 label1-regular text-gray-700 leading-relaxed">
        <p className="whitespace-pre-wrap">{description}</p>
      </div>
    </InfoCard>
  );
};

export default DescriptionArea;
