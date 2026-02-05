import type { NavigateFunction } from 'react-router-dom';
import { ROUTES } from '@/app/routes/Router';
import { Button } from '@/shared/components/shadcn/button';
import { useModal } from '@/shared/hooks/useModal';
import MovingBoo from '@/shared/components/ui/MovingBoo';

interface MemoUnsavedModalContentProps {
  projectId: string;
  navigate: NavigateFunction;
}

const MemoUnsavedModalContent = ({ projectId, navigate }: MemoUnsavedModalContentProps) => {
  const { resetModal } = useModal();

  const handleConfirm = () => {
    resetModal();
    navigate(ROUTES.PROJECT_MEMO_LIST(projectId));
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <MovingBoo size={28} />
      <p className="text-gray-600 label1-regular">그래도 나가시겠습니까?</p>
      <div className="flex gap-2 mt-2 w-full">
        <Button
          variant="outline"
          onClick={resetModal}
          className="flex-1 border-gray-300 hover:bg-gray-200"
        >
          취소
        </Button>
        <Button variant="defaultBoost" onClick={handleConfirm} className="flex-1">
          나가기
        </Button>
      </div>
    </div>
  );
};

export default MemoUnsavedModalContent;
