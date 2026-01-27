import { useModal } from '@/shared/hooks/useModal';
import toast from 'react-hot-toast';
import ProjectCreateModalContent from '@/features/project/components/ProjectCreateModal/ProjectCreateModalContent';
import ProjectJoinCodeInputModalContent from '@/features/project/components/ProjectJoinModal/ProjectJoinCodeInputModalContent';
import { useCreateProjectMutation } from '@/features/project/hooks/useCreateProjectMutation';
import { useJoinProjectMutation } from '@/features/project/hooks/useProjectJoinMutation';

export const useProjectModals = () => {
  const { showCustom } = useModal();
  const createProjectMutation = useCreateProjectMutation();
  const { mutateAsync: joinProjectMutation } = useJoinProjectMutation();

  const showCreateProjectModal = () => {
    showCustom({
      title: '프로젝트 생성하기',
      description: '프로젝트 이름을 입력하면, 새 프로젝트를 생성할 수 있어요.',
      content: (
        <ProjectCreateModalContent
          onConfirm={async (projectName) => {
            try {
              await createProjectMutation.mutateAsync(projectName);
              toast.success('프로젝트가 성공적으로 생성되었습니다!');
            } catch (error) {
              console.error('프로젝트 생성 실패:', error);
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
          onConfirm={async (joinCode) => {
            await joinProjectMutation(joinCode);
          }}
          onCreateClick={showCreateProjectModal}
        />
      ),
    });
  };

  return { showCreateProjectModal, showJoinProjectModal };
};
