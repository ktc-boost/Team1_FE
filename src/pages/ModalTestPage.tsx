import { useAiTransformModals } from '@/features/ai-transform/hooks/useAiTransformModals';
import { useAiTransformStore } from '@/features/ai-transform/store/useAiTransformStore';
import { Button } from '@/shared/components/shadcn/button';

const ModalTestPage = () => {
  const { showAiTransformSelectModal } = useAiTransformModals();
  const setTransformedText = useAiTransformStore((state) => state.setTransformedText);
  const setOriginalText = useAiTransformStore((state) => state.setOriginalText);

  const testText = Array.from({ length: 200 }, (_, i) => `test${i}`).join(' ');

  setTransformedText(testText);
  setOriginalText(testText);

  return (
    <div className="flex h-screen items-center justify-center">
      <Button onClick={showAiTransformSelectModal}>AI 댓글 변환 선택 모달</Button>
    </div>
  );
};

export default ModalTestPage;
