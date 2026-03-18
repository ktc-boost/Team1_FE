import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/app/routes/routeHelpers';
import { useModal } from '@/shared/hooks/useModal';
import type { MemberWithBoosting } from '@/features/project/types/projectTypes';
import { useCreateProjectMutation } from '@/features/project/hooks/mutation/useCreateProjectMutation';
import { useJoinProject } from '@/features/project/hooks/domain/useJoinProject';
import ProjectCreateModalContent from '@/features/project/components/ProjectCreateModal/ProjectCreateModalContent';
import ProjectJoinCodeInputModalContent from '@/features/project/components/ProjectJoinModal/ProjectJoinCodeInputModalContent';
import ProjectDeleteModalContent from '@/features/project/components/ProjectDeleteModal/ProjectDeleteModalContent';
import ProjectLeaveModalContent from '@/features/project/components/ProjectLeaveModal/ProjectLeaveModalContent';
import ProjectKickMemberModalContent from '@/features/project/components/ProjectKickMemberModal/ProjectKickMemberModalContent';

export const useProjectModals = () => {
  const { showCustom } = useModal();
  const { joinProject } = useJoinProject();
  const { mutateAsync: createProjectMutation } = useCreateProjectMutation();
  const navigate = useNavigate();

  const showCreateProjectModal = () => {
    showCustom({
      title: '프로젝트 생성하기',
      description: '프로젝트 이름을 입력하면, 새 프로젝트를 생성할 수 있어요.',
      content: (
        <ProjectCreateModalContent
          onConfirm={async (projectName) => {
            try {
              const createdProject = await createProjectMutation(projectName);
              toast.success('프로젝트가 성공적으로 생성되었습니다!');
              navigate(ROUTES.PROJECT_BOARD(createdProject.id));
            } catch {
              toast.error('프로젝트 생성에 실패했어요.');
            }
          }}
          onJoinClick={showJoinProjectModal}
        />
      ),
    });
  };

  const showJoinProjectModal = () => {
    showCustom({
      title: '프로젝트 참여하기',
      description: '프로젝트 참여 코드를 입력하면, 프로젝트에 참여할 수 있어요.',
      content: (
        <ProjectJoinCodeInputModalContent
          onConfirm={joinProject}
          onCreateClick={showCreateProjectModal}
        />
      ),
    });
  };

  const showDeleteProjectModal = () => {
    showCustom({
      title: '프로젝트 삭제',
      titleAlign: 'center',
      description: '정말로 프로젝트를 삭제하시나요? 🥹',
      size: 'sm',
      content: <ProjectDeleteModalContent />,
    });
  };

  const showLeaveProjectModal = () => {
    showCustom({
      title: '프로젝트 떠나기',
      description: '정말로 프로젝트를 떠나시나요? 🥹',
      titleAlign: 'center',
      size: 'sm',
      content: <ProjectLeaveModalContent />,
    });
  };

  const showKickProjectMemberModal = (projectId: string, member: MemberWithBoosting) => {
    showCustom({
      title: '멤버 추방',
      description: `${member.name}님을 프로젝트에서 추방하시겠어요?`,
      titleAlign: 'center',
      size: 'sm',
      content: <ProjectKickMemberModalContent projectId={projectId} member={member} />,
    });
  };

  return {
    showCreateProjectModal,
    showJoinProjectModal,
    showDeleteProjectModal,
    showLeaveProjectModal,
    showKickProjectMemberModal,
  };
};
