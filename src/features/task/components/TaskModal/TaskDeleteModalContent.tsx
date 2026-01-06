import { useModal } from '@/shared/hooks/useModal';
import { Button } from '@/shared/components/shadcn/button';
import MovingBoo from '@/shared/components/ui/MovingBoo';

interface TaskDeleteModalContentProps {
  onClickDelete: () => void;
}

const TaskDeleteModalContent = ({ onClickDelete }: TaskDeleteModalContentProps) => {
  const { resetModal } = useModal();

  return (
    <div className="flex flex-col items-center gap-3">
      <MovingBoo size={28} />
      <p className="text-gray-600 label1-regular">이 작업은 되돌릴 수 없어요!</p>

      <div className="flex gap-2 mt-2 w-full">
        <Button
          variant="outline"
          onClick={resetModal}
          className="flex-1 border-gray-300 hover:bg-gray-200 cursor-pointer"
        >
          취소
        </Button>
        <Button variant="defaultBoost" onClick={onClickDelete} className="flex-1">
          삭제
        </Button>
      </div>
    </div>
  );
};

export default TaskDeleteModalContent;
