import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';
import type { NavigateFunction } from 'react-router-dom';
import { DialogFooter } from '@/shared/components/shadcn/dialog';
import { Button } from '@/shared/components/shadcn/button';
import { useModal } from '@/shared/hooks/useModal';
import ProjectBasicInfo from '@/features/project/components/ProjectManageModal/ProjectManageBasicInfo';
import ProjectDeleteModalContent from '@/features/project/components/ProjectDeleteModal/ProjectDeleteModalContent';
import { useProjectStore } from '@/features/project/store/useProjectStore';
import ProjectMembers from '@/features/project/components/ProjectMembersList';
import { useUpdateProjectMutation } from '@/features/project/hooks/mutation/useUpdateProjectMutation';
import { useProjectMembersQuery } from '@/features/project/hooks/query/useProjectMembersQuery';
import { useProjectBoostingScoresQuery } from '@/features/project/hooks/query/useProjectBoostingScoresQuery';
import { combineMembersWithBoostingScores } from '@/features/project/utils/memberUtils';

interface ProjectUpdateModalProps {
  navigate: NavigateFunction;
}

const ProjectUpdateModalContent = ({ navigate }: ProjectUpdateModalProps) => {
  const { showCustom, resetModal } = useModal();

  const projectData = useProjectStore((state) => state.projectData);
  const { data: projectMembers } = useProjectMembersQuery(projectData.id);
  const { data: projectBoostingScores } = useProjectBoostingScoresQuery(projectData.id);

  const projectMembersWithBoosting = combineMembersWithBoostingScores(
    projectMembers,
    projectBoostingScores,
  );

  const setProjectData = useProjectStore((state) => state.setProjectData);
  const { mutate: updateProject } = useUpdateProjectMutation();

  const handleProjectDeleteClick = () => {
    showCustom({
      title: '프로젝트 삭제',
      titleAlign: 'center',
      description: '정말로 프로젝트를 삭제하시나요? 🥹',
      size: 'sm',
      content: <ProjectDeleteModalContent navigate={navigate} />,
    });
  };

  const handleProjectUpdateClick = () => {
    updateProject(
      {
        projectId: projectData.id,
        updatedData: {
          name: projectData.name,
          defaultReviewerCount: projectData.defaultReviewerCount,
        },
      },
      {
        onSuccess: (updateProjectData) => {
          setProjectData(updateProjectData);
          toast.success('프로젝트가 수정되었습니다.');
          resetModal();
        },
        onError: () => toast.error('수정에 실패했습니다.'),
      },
    );
  };

  return (
    <>
      <div className="flex flex-row gap-8 py-4 max-h-[400px] px-1 ">
        <ProjectMembers members={projectMembersWithBoosting} />
        <ProjectBasicInfo />
      </div>

      <DialogFooter className="!mt-0 pt-4 border-t border-gray-300 flex !justify-between items-center">
        <Button
          variant="outline"
          className="flex flex-row bg-gray-100 subtitle2-bold text-boost-orange border border-boost-orange hover:bg-boost-orange hover:text-gray-100 duration-300"
          onClick={handleProjectDeleteClick}
        >
          <Trash2 className="mr-1 h-5 w-5" />
          프로젝트 삭제
        </Button>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={resetModal}
            className="border-gray-300 hover:bg-gray-300 duration-300 subtitle2-regular"
          >
            취소
          </Button>
          <Button
            onClick={handleProjectUpdateClick}
            className="bg-boost-blue hover:bg-boost-blue-pressed duration-300 subtitle2-regular"
          >
            변경사항 저장
          </Button>
        </div>
      </DialogFooter>
    </>
  );
};

export default ProjectUpdateModalContent;
