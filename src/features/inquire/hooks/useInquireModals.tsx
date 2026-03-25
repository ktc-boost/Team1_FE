import { useModal } from '@/shared/hooks/useModal';
import InquireModalContent from '@/features/inquire/components/InquireModalContent';

export const useInquireModals = () => {
  const { showCustom } = useModal();

  const showInquireModal = () => {
    showCustom({
      title: '문의 및 피드백 하기',
      description: '문의 및 피드백 사항이 있으신가요?',
      titleAlign: 'center',
      size: 'md',
      content: <InquireModalContent />,
    });
  };

  return {
    showInquireModal,
  };
};
