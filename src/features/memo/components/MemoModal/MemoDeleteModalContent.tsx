import toast from 'react-hot-toast';
import type { NavigateFunction } from 'react-router-dom';
import { ROUTES } from '@/app/routes/Router';
import { Button } from '@/shared/components/shadcn/button';
import MovingBoo from '@/shared/components/ui/MovingBoo';
import { useModal } from '@/shared/hooks/useModal';
import SmallLoader from '@/shared/components/ui/loading/SmallLoader';
import { useDeleteMemoMutation } from '@/features/memo/hooks/mutation/useDeleteMemoMutation';
import { useProjectStore } from '@/features/project/store/useProjectStore';

interface MemoDeleteModalContentProps {
  memoIds: string[];
  navigate: NavigateFunction;
  onDeleteSuccess?: (deletedIds: string[]) => void;
}

const MemoDeleteModalContent = ({
  memoIds,
  navigate,
  onDeleteSuccess,
}: MemoDeleteModalContentProps) => {
  const { projectData } = useProjectStore();
  const { resetModal } = useModal();
  const { mutateAsync: deleteMemo, isPending } = useDeleteMemoMutation(projectData.id);

  if (!projectData) return null;

  const handleDeleteConfirm = async () => {
    try {
      await Promise.all(memoIds.map((id) => deleteMemo(id)));
      onDeleteSuccess?.(memoIds);
      resetModal();
      navigate(ROUTES.PROJECT_MEMO_LIST(projectData.id));
      toast.success(`${memoIds.length}개의 메모가 삭제되었습니다.`);
    } catch (error) {
      toast.error(
        `메모 삭제 실패: ${error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'}`,
      );
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <MovingBoo size={28} />
      <p className="text-gray-600 label1-regular">이 작업은 되돌릴 수 없어요!</p>

      <div className="flex gap-2 mt-2 w-full">
        <Button
          variant="outline"
          onClick={resetModal}
          className="flex-1 border-gray-300 hover:bg-gray-200"
        >
          취소
        </Button>
        <Button
          variant="defaultBoost"
          onClick={handleDeleteConfirm}
          disabled={isPending}
          className="flex-1"
        >
          {isPending ? <SmallLoader text="삭제 중.." /> : '삭제'}
        </Button>
      </div>
    </div>
  );
};

export default MemoDeleteModalContent;
