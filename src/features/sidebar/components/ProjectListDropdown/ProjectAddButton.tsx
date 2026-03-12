import { SquarePlus } from 'lucide-react';
import { DropdownMenuItem } from '@/shared/components/shadcn/dropdown-menu';
import { useProjectModals } from '@/features/project/hooks/modal/useProjectModals';

const ProjectAddButton = () => {
  const { showJoinProjectModal } = useProjectModals();

  return (
    <DropdownMenuItem
      className="flex items-center pl-2 gap-2 cursor-pointer transition-colors duration-200"
      onClick={showJoinProjectModal}
    >
      <SquarePlus className="w-4 text-gray-600" />
      <span className="label1-regular text-gray-600">프로젝트 참여 및 생성</span>
    </DropdownMenuItem>
  );
};

export default ProjectAddButton;
