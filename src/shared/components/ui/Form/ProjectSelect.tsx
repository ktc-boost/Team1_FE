import type { Project } from '@/features/project/types/projectTypes';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/shared/components/shadcn/select';

interface ProjectSelectProps {
  selectedProjectId?: string;
  projects: Project[];
  onProjectSelect: (id: string) => void;
  disabled?: boolean;
}

const ProjectSelect = ({
  selectedProjectId,
  projects,
  onProjectSelect,
  disabled,
}: ProjectSelectProps) => {
  return (
    <Select
      value={selectedProjectId}
      onValueChange={(val) => onProjectSelect(val)}
      disabled={disabled}
    >
      <SelectTrigger className="w-full !h-11">
        <SelectValue placeholder="프로젝트를 선택하세요" />
      </SelectTrigger>
      <SelectContent className="max-h-60 overflow-y-auto border-gray-300">
        {projects.map((project) => (
          <SelectItem key={project.id} value={project.id}>
            {project.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ProjectSelect;
