import { DropdownMenuItem } from '@/shared/components/shadcn/dropdown-menu';
import { SquarePlus } from 'lucide-react';
import { useProjectModals } from '@/features/project/hooks/modal/useProjectModals';

const ProjectCreateButton = () => {
  const { showJoinProjectModal } = useProjectModals();

  return (
    <DropdownMenuItem
      className="flex items-center pl-2 gap-2 cursor-pointer"
      onClick={showJoinProjectModal}
    >
      <SquarePlus className="w-4 text-gray-600" />
      <span className="text-sm text-gray-600">프로젝트 참여 및 생성</span>
    </DropdownMenuItem>
  );
};

export default ProjectCreateButton;
