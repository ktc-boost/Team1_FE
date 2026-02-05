import InfoRow from '@/shared/components/ui/InfoRow';
import { useProjectStore } from '@/features/project/store/useProjectStore';

const ProjectInfoBasicInfo = () => {
  const projectData = useProjectStore((state) => state.projectData);

  return (
    <div className="flex-1 rounded-xl p-1 space-y-6 pt-3 pl-2">
      <InfoRow label="프로젝트 이름" value={projectData.name} />
      <InfoRow label="기본 검토 수" value={`${projectData.defaultReviewerCount}명`} />
    </div>
  );
};

export default ProjectInfoBasicInfo;
