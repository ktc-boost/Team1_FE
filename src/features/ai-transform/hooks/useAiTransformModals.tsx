import { useModal } from '@/shared/hooks/useModal';
import { useIsTablet } from '@/shared/hooks/use-tablet';
import AiTransformConfirmModalContent from '@/features/ai-transform/components/AiTransformConfirmModal/AiTransformConfirmModalContent';
import AiTransformLoadingModalContent from '@/features/ai-transform/components/AiTransformLoadingModal/AiTransformLoadingModalContent';
import AiTransformSelectModalContent from '@/features/ai-transform/components/AiTransformSelectModal/AiTransformSelectModalContent';

export const useAiTransformModals = () => {
  const { showCustom } = useModal();
  const isTablet = useIsTablet();

  const showAiTransformConfirmModal = () => {
    showCustom({
      title: 'AI 댓글 변환',
      size: 'md',
      titleAlign: 'center',
      description: 'Boo가 댓글을 예쁘게 다듬어줄 거예요!',
      content: <AiTransformConfirmModalContent />,
    });
  };

  const showAiTransformLoadingModal = () => {
    showCustom({
      title: '댓글 변환 중..',
      size: 'sm',
      titleAlign: 'center',
      content: <AiTransformLoadingModalContent />,
      closeOnOutsideClick: false,
      showCloseButton: false,
    });
  };

  const showAiTransformSelectModal = () => {
    showCustom({
      title: '댓글 변환이 완료되었어요!',
      description: '원하는 쪽을 선택해주세요.',
      size: isTablet ? 'lg' : 'lgPlus',
      titleAlign: 'center',
      content: <AiTransformSelectModalContent />,
    });
  };

  return { showAiTransformConfirmModal, showAiTransformLoadingModal, showAiTransformSelectModal };
};
