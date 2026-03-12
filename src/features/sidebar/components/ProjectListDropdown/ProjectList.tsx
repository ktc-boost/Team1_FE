import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@/app/routes/routeHelpers';
import SmallLoader from '@/shared/components/ui/loading/SmallLoader';
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/shared/components/shadcn/dropdown-menu';
import { useProjectsQuery } from '@/features/project/hooks/query/useProjectsQuery';

const ProjectList = () => {
  const navigate = useNavigate();
  const { data: projects, isLoading } = useProjectsQuery();
  const { projectId: currentProjectId } = useParams<{ projectId: string }>();

  const handleProjectChange = (value: string) => {
    navigate(ROUTES.PROJECT_BOARD(value));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-6 text-gray-600">
        <SmallLoader
          text="프로젝트 불러오는 중..."
          className="label1-regular"
          loaderClassName="w-3 h-3"
        />
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return <p className="label2-regular text-gray-500 text-center py-2">프로젝트가 없습니다</p>;
  }

  return (
    <DropdownMenuRadioGroup value={currentProjectId} onValueChange={handleProjectChange}>
      {projects.map((project) => (
        <DropdownMenuRadioItem
          key={project.id}
          value={project.id}
          className="cursor-pointer transition-colors duration-200"
        >
          {project.name}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  );
};

export default ProjectList;
