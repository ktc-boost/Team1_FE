import { Outlet, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ProjectHeader from '@/features/project/components/ProjectPageComponents/ProjectHeader';
import ProjectTopTab from '@/features/project/components/ProjectPageComponents/ProjectTopTab';
import { Separator } from '@/shared/components/shadcn/separator';
import { useProjectQuery } from '@/features/project/hooks/query/useProjectQuery';
import { useProjectStore } from '@/features/project/store/useProjectStore';
import FullPageLoader from '@/shared/components/ui/loading/FullPageLoader';

const ProjectPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { data: project, isLoading, isError } = useProjectQuery(projectId);
  const { setProjectData } = useProjectStore();

  useEffect(() => {
    if (project) setProjectData(project);
  }, [project, setProjectData]);

  if (isLoading) return <FullPageLoader text="프로젝트 불러오는 중.." />;

  if (isError || !project)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        프로젝트 정보를 불러오지 못했습니다.
      </div>
    );

  return (
    <div className="flex flex-col flex-1 h-screen overflow-x-auto">
      <nav aria-label="top-tab">
        <ProjectTopTab />
      </nav>

      <header aria-label="header">
        <ProjectHeader project={project} />
      </header>

      <Separator className="bg-gray-300" />

      <section aria-label="content" className="overflow-x-auto flex-1">
        <Outlet context={{ projectId }} />
      </section>
    </div>
  );
};

export default ProjectPage;
