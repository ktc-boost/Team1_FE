import { useModal } from '@/shared/hooks/useModal';
import { useProjectStore } from '@/features/project/store/useProjectStore';
import TaskDeleteModalContent from '@/features/task/components/TaskModal/TaskDeleteModalContent';

export const useTaskModals = () => {
  const { showCustom } = useModal();
  const projectData = useProjectStore((state) => state.projectData);

  const showDeleteTaskModal = (onClickDelete: () => void) => {
    if (!projectData) return;

    showCustom({
      title: '할 일 삭제',
      titleAlign: 'center',
      description: '이 할 일을 정말 삭제하시겠어요?',
      size: 'sm',
      content: <TaskDeleteModalContent onClickDelete={onClickDelete} />,
    });
  };

  return { showDeleteTaskModal };
};
