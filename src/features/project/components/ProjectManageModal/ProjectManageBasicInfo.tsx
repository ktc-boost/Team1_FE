import { useProjectStore } from '@/features/project/store/useProjectStore';
import EditField from '@/shared/components/ui/form/EditField';

const ProjectManageBasicInfo = () => {
  const { projectData, updateProjectData } = useProjectStore();

  return (
    <div className="flex-1 rounded-xl p-1 space-y-6 pt-3 pl-2">
      <EditField
        label="프로젝트 이름"
        value={projectData.name}
        onSave={(newValue) => updateProjectData({ name: newValue as string })}
      />
      <EditField
        label="기본 검토 수"
        value={projectData.defaultReviewerCount}
        type="number"
        onSave={(newValue) =>
          updateProjectData({ ...projectData, defaultReviewerCount: newValue as number })
        }
      />
    </div>
  );
};

export default ProjectManageBasicInfo;
