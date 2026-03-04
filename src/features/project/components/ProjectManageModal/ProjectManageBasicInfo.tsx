import { useProjectStore } from '@/features/project/store/useProjectStore';
import EditField from '@/shared/components/ui/form/EditField';

const ProjectManageBasicInfo = () => {
  const { projectData, updateProjectData } = useProjectStore();

  return (
    <div className="flex-1 rounded-xl p-1 gap-2 md:gap-6 pt-1 md:pt-3 pl-2">
      <EditField
        label="프로젝트 이름"
        value={projectData.name}
        onSave={(newValue: string) => updateProjectData({ name: newValue })}
      />
      <EditField
        label="기본 검토 수"
        value={projectData.defaultReviewerCount}
        type="number"
        onSave={(newValue: number) => updateProjectData({ defaultReviewerCount: newValue })}
      />
    </div>
  );
};

export default ProjectManageBasicInfo;
