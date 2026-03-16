import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/shared/components/shadcn/dropdown-menu';
import ProjectAddButton from '@/features/sidebar/components/ProjectListDropdown/ProjectAddButton';
import ProjectList from '@/features/sidebar/components/ProjectListDropdown/ProjectList';

interface ProjectListDropdownProps {
  title: string;
}

const ProjectListDropdown = ({ title }: ProjectListDropdownProps) => {
  return (
    <DropdownMenuContent
      side="right"
      align="start"
      sideOffset={30}
      className="w-56 sm:w-62 pt-2 pb-2 border-gray-300 bg-white"
    >
      <DropdownMenuLabel className="!label1-bold">{title}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <ProjectList />
      <DropdownMenuSeparator />
      <ProjectAddButton />
    </DropdownMenuContent>
  );
};

export default ProjectListDropdown;
