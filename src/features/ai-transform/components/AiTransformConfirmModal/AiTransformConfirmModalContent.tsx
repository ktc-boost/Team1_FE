import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/shared/components/shadcn/button';
import { useModal } from '@/shared/hooks/useModal';
import MovingBoo from '@/shared/components/ui/MovingBoo';
import { useAiTransformMutation } from '@/features/ai-transform/hooks/useAiTransformMutation';
import { useAiTransformStore } from '@/features/ai-transform/store/useAiTransformStore';
import { useAiTransformModals } from '@/features/ai-transform/hooks/useAiTransformModals';

const AiTransformConfirmModalContent = () => {
  const originalText = useAiTransformStore((state) => state.originalText);
  const setTransformedText = useAiTransformStore((state) => state.setTransformedText);

  const { showAiTransformLoadingModal, showAiTransformSelectModal } = useAiTransformModals();
  const { resetModal } = useModal();

  const { mutateAsync: aiTransformMutateAsync } = useAiTransformMutation();

  const handleTransformConfirm = async () => {
    const minDelay = new Promise((resolve) => setTimeout(resolve, 3000));
    showAiTransformLoadingModal();

    try {
      const firstAttempt = await Promise.all([
        minDelay,
        aiTransformMutateAsync({ text: originalText }),
      ]);

      setTransformedText(firstAttempt[1].transformedText);
      showAiTransformSelectModal();
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 500) {
        try {
          const retryData = await aiTransformMutateAsync({ text: originalText });
          resetModal();
          setTransformedText(retryData.transformedText);
          showAiTransformSelectModal();
        } catch (retryError) {
          console.log(retryError);
        }
      } else {
        console.log(error);
      }

      resetModal();
      toast.error('댓글 변환을 실패했어요.');
    }
  };

  const handleCancelClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    resetModal();
    useAiTransformStore.getState().reset();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <MovingBoo />

      <p className="subtitle2-bold">아래 댓글을 변환할까요?</p>
      <ArrowDown className="text-gray-400" />
      <div className="w-full p-4 border rounded-md bg-gray-200 border-gray-400">
        <p className="text-sm">{originalText}</p>
      </div>

      <div className="flex gap-2 mt-2 w-full flex-col">
        <Button variant="defaultBoost" onClick={handleTransformConfirm} className="flex-1">
          변환하기
        </Button>

        <Button
          onClick={handleCancelClick}
          variant="link"
          className="text-gray-500 hover:text-gray-600"
        >
          안 할래요
        </Button>
      </div>
    </div>
  );
};

export default AiTransformConfirmModalContent;
