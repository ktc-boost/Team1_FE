import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';
import { DialogFooter } from '@/shared/components/shadcn/dialog';
import { Button } from '@/shared/components/shadcn/button';
import { useModal } from '@/shared/hooks/useModal';
import ProjectBasicInfo from '@/features/project/components/ProjectManageModal/ProjectManageBasicInfo';
import { useProjectStore } from '@/features/project/store/useProjectStore';
import { useProjectModals } from '@/features/project/hooks/modal/useProjectModals';
import { useUpdateProjectMutation } from '@/features/project/hooks/mutation/useUpdateProjectMutation';
import { useProjectMembersQuery } from '@/features/project/hooks/query/useProjectMembersQuery';
import { useProjectBoostingScoresQuery } from '@/features/project/hooks/query/useProjectBoostingScoresQuery';
import ProjectMembers from '@/features/project/components/ProjectMembersList';
import { combineMembersWithBoostingScores } from '@/features/project/utils/memberUtils';

const ProjectManageModalContent = () => {
  const { resetModal } = useModal();
  const { showDeleteProjectModal } = useProjectModals();

  const projectData = useProjectStore((state) => state.projectData);
  const setProjectData = useProjectStore((state) => state.setProjectData);

  const { data: projectMembers } = useProjectMembersQuery(projectData.id);
  const { data: projectBoostingScores } = useProjectBoostingScoresQuery(projectData.id);

  const projectMembersWithBoosting = combineMembersWithBoostingScores(
    projectMembers,
    projectBoostingScores,
  );

  const { mutate: updateProject } = useUpdateProjectMutation({
    onSuccess: (updatedProject) => {
      setProjectData(updatedProject);
      toast.success('프로젝트가 수정되었습니다.');
      resetModal();
    },
    onError: () => toast.error('프로젝트 수정에 실패했습니다.'),
  });

  const handleProjectUpdateClick = () => {
    updateProject({
      projectId: projectData.id,
      updatedData: {
        name: projectData.name,
        defaultReviewerCount: projectData.defaultReviewerCount,
      },
    });
  };

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-8 py-4 px-1">
        <ProjectMembers members={projectMembersWithBoosting} />
        <ProjectBasicInfo />
      </div>

      <DialogFooter className="flex flex-row !mt-0 pt-4 border-t border-gray-300 !justify-between items-center">
        <Button
          variant="outlineSecondaryBoost"
          className="rounded-full"
          onClick={showDeleteProjectModal}
        >
          <Trash2 className="h-5 w-5 md:mr-1" />
          <span className="hidden md:inline subtitle2-bold">프로젝트 삭제</span>
        </Button>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={resetModal}
            className="border-gray-300 hover:bg-gray-300 px-3 md:px-5"
          >
            취소
          </Button>

          <Button
            variant="defaultBoost"
            onClick={handleProjectUpdateClick}
            className="px-3 md:px-5"
          >
            저장
          </Button>
        </div>
      </DialogFooter>
    </>
  );
};

export default ProjectManageModalContent;
