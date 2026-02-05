import { Trash2 } from 'lucide-react';
import { DialogFooter } from '@/shared/components/shadcn/dialog';
import { Button } from '@/shared/components/shadcn/button';
import { useModal } from '@/shared/hooks/useModal';
import { useProjectStore } from '@/features/project/store/useProjectStore';
import ProjectMembers from '@/features/project/components/ProjectMembersList';
import { useProjectMembersQuery } from '@/features/project/hooks/query/useProjectMembersQuery';
import { useProjectModals } from '@/features/project/hooks/modal/useProjectModals';
import { useProjectBoostingScoresQuery } from '@/features/project/hooks/query/useProjectBoostingScoresQuery';
import ProjectInfoBasicInfo from '@/features/project/components/ProjectInfoModal/ProjectInfoBasicInfo';
import { combineMembersWithBoostingScores } from '@/features/project/utils/memberUtils';

const ProjectInfoModalContent = () => {
  const projectData = useProjectStore((state) => state.projectData);

  const { data: projectMembers } = useProjectMembersQuery(projectData.id);
  const { data: projectBoostingScores } = useProjectBoostingScoresQuery(projectData.id);

  const { showLeaveProjectModal } = useProjectModals();
  const { resetModal } = useModal();

  const projectMembersWithBoosting = combineMembersWithBoostingScores(
    projectMembers,
    projectBoostingScores,
  );

  const handleProjectLeaveClick = () => showLeaveProjectModal();

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row gap-8 py-4 px-1">
        <ProjectMembers members={projectMembersWithBoosting} />
        <ProjectInfoBasicInfo />
      </div>

      <DialogFooter className="flex flex-row !mt-0 pt-4 border-t border-gray-300 !justify-between items-center">
        <Button
          variant="outlineSecondaryBoost"
          className="rounded-full"
          onClick={handleProjectLeaveClick}
        >
          <Trash2 className="h-5 w-5" />
          <span className="hidden md:inline subtitle2-bold">프로젝트 떠나기</span>
        </Button>

        <Button variant="defaultBoost" onClick={resetModal} className="px-3 md:px-5">
          닫기
        </Button>
      </DialogFooter>
    </>
  );
};

export default ProjectInfoModalContent;
