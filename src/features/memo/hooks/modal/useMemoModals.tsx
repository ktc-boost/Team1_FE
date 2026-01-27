import { useModal } from '@/shared/hooks/useModal';
import type { NavigateFunction } from 'react-router-dom';
import MemoDeleteModalContent from '@/features/memo/components/MemoList/MemoDeleteModalContent';
import MemoUnsavedModalContent from '@/features/memo/components/MemoEditor/MemoUnsavedModalContent';
import { useProjectStore } from '@/features/project/store/useProjectStore';
import MemoEmptyFieldsModalContent from '@/features/memo/components/MemoEditor/MemoEmptyFieldsModalContent';

export const useMemoModals = () => {
  const { showCustom } = useModal();
  const { projectData } = useProjectStore();

  const showDeleteMemoModal = (
    memoIds: string[],
    navigate: NavigateFunction,
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
      content: (
        <MemoDeleteModalContent
          memoIds={memoIds}
          navigate={navigate}
          onDeleteSuccess={onDeleteSuccess}
        />
      ),
    });
  };

  const showUnsavedChangesModal = (projectId: string, navigate: NavigateFunction) => {
    showCustom({
      title: '변경 사항 확인',
      titleAlign: 'center',
      description: '저장되지 않은 변경 사항이 있습니다.',
      size: 'sm',
      content: <MemoUnsavedModalContent projectId={projectId} navigate={navigate} />,
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
