import MemoDeleteModalContent from '@/features/memo/components/MemoModal/MemoDeleteModalContent';
import MemoUnsavedModalContent from '@/features/memo/components/MemoModal/MemoUnsavedModalContent';
import MemoEmptyFieldsModalContent from '@/features/memo/components/MemoModal/MemoEmptyFieldsModalContent';
import { useProjectStore } from '@/features/project/store/useProjectStore';
import { useModal } from '@/shared/hooks/useModal';

export const useMemoModals = () => {
  const { showCustom } = useModal();
  const { projectData } = useProjectStore();

  const showDeleteMemoModal = (
    memoIds: string[],
    onDeleteSuccess?: (deletedIds: string[]) => void,
  ) => {
    if (!projectData) return;

    showCustom({
      title: '메모 삭제',
      titleAlign: 'center',
      description:
        memoIds.length > 1
          ? `${memoIds.length}개의 메모를 삭제하시겠어요? 🥹`
          : '정말로 이 메모를 삭제하시나요? 🥹',
      size: 'sm',
      content: <MemoDeleteModalContent memoIds={memoIds} onDeleteSuccess={onDeleteSuccess} />,
    });
  };

  const showUnsavedChangesModal = (projectId: string) => {
    showCustom({
      title: '변경 사항 확인',
      titleAlign: 'center',
      description: '저장되지 않은 변경 사항이 있습니다.',
      size: 'sm',
      content: <MemoUnsavedModalContent projectId={projectId} />,
    });
  };

  const showEmptyFieldsModal = () => {
    showCustom({
      title: '입력 확인',
      titleAlign: 'center',
      description: '제목이나 내용을 비울 수 없습니다.',
      size: 'sm',
      content: <MemoEmptyFieldsModalContent />,
    });
  };

  return { showDeleteMemoModal, showUnsavedChangesModal, showEmptyFieldsModal };
};
