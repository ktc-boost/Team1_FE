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
      <div className="flex flex-row gap-8 py-4 max-h-[400px] px-1 ">
        <ProjectMembers members={projectMembersWithBoosting} />
        <ProjectInfoBasicInfo />
      </div>

      <DialogFooter className="!mt-0 pt-4 border-t border-gray-300 flex !justify-between items-center">
        <Button
          variant="outline"
          className="flex flex-row bg-gray-100 subtitle2-bold text-boost-orange border border-boost-orange hover:bg-boost-orange hover:text-gray-100 duration-300"
          onClick={handleProjectLeaveClick}
        >
          <Trash2 className="mr-1 h-5 w-5" />
          프로젝트 떠나기
        </Button>

        <div className="flex gap-2">
          <Button variant="defaultBoost" onClick={resetModal}>
            닫기
          </Button>
        </div>
      </DialogFooter>
    </>
  );
};

export default ProjectInfoModalContent;
