import { Button } from '@/shared/components/shadcn/button';
import MovingBoo from '@/shared/components/ui/MovingBoo';
import { useModal } from '@/shared/hooks/useModal';

const MemoEmptyFieldsModalContent = () => {
  const { resetModal } = useModal();

  return (
    <div className="flex flex-col items-center gap-3">
      <MovingBoo size={28} />
      <div className="flex gap-2 mt-2 w-full">
        <Button variant="defaultBoost" onClick={resetModal} className="flex-1">
          확인
        </Button>
      </div>
    </div>
  );
};

export default MemoEmptyFieldsModalContent;
