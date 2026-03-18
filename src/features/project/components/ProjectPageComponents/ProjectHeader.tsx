import Header from '@/widgets/Header';
import { useModal } from '@/shared/hooks/useModal';
import { useNavigate, useLocation } from 'react-router-dom';
import ProjectManageModalContent from '@/features/project/components/ProjectManageModal/ProjectManageModalContent';
import ProjectJoinCodeViewModalContent from '@/features/project/components/ProjectJoinModal/ProjectJoinCodeViewModalContent';
import TaskCreateModalContent from '@/features/task/components/TaskModal/TaskCreateModalContent';
import type { Project } from '@/features/project/types/projectTypes';
import { ROUTES } from '@/app/routes/routeHelpers';
import { ROLES } from '@/features/project/constants/projectConstants';
import ProjectInfoModalContent from '@/features/project/components/ProjectInfoModal/ProjectInfoModalContent';
import { useMemoEditorStore } from '@/features/memo/store/useMemoEditorStore';
import { useMemoModals } from '@/features/memo/hooks/modal/useMemoModals';

interface ProjectHeaderProps {
  project: Project;
}

const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  const { showCustom } = useModal();
  const navigate = useNavigate();
  const location = useLocation();
  const { showUnsavedChangesModal } = useMemoModals();
  const isDirty = useMemoEditorStore((state) => state.isDirty);

  const isOwner = project?.role === ROLES.OWNER;

  const handleButtonClick = () => {
    if (location.pathname.includes('/memo')) {
      if (isDirty) {
        showUnsavedChangesModal(project.id, navigate);
        return;
      }
      navigate(ROUTES.PROJECT_MEMO_EDIT(project.id));
    } else {
      showCustom({
        title: '할 일 생성',
        size: 'lg',
        description: '새로운 할 일을 만들어보세요!',
        content: <TaskCreateModalContent isMyTask={false} projectId={project.id} />,
      });
    }
  };

  const handleProjectMoreClick = () => {
    if (isOwner) {
      showCustom({
        title: '프로젝트 관리',
        size: 'lg',
        description: '프로젝트 기본 정보와 멤버를 관리합니다.',
        content: <ProjectManageModalContent />,
      });
    } else {
      showCustom({
        title: '프로젝트 정보',
        size: 'lg',
        description: '프로젝트 기본 정보와 멤버를 확인합니다.',
        content: <ProjectInfoModalContent />,
      });
    }
  };

  return (
    <Header
      title={project.name}
      showProjectActions
      onProjectManageClick={handleProjectMoreClick}
      onProjectJoinCodeClick={() =>
        showCustom({
          title: '프로젝트 참여 코드 확인',
          description: '프로젝트 참여 코드를 확인하거나 복사할 수 있어요.',
          content: <ProjectJoinCodeViewModalContent projectId={project.id} />,
        })
      }
      onCreate={handleButtonClick}
      createLabel={location.pathname.includes('/memo') ? '메모 생성' : '할 일 생성'}
    />
  );
};

export default ProjectHeader;
