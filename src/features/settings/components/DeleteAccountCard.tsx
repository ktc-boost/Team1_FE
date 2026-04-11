import { UserX } from 'lucide-react';
import { useModal } from '@/shared/hooks/useModal';
import { Button } from '@/shared/components/shadcn/button';
import { SettingsSectionCard } from '@/features/settings/components/SettingsSectionCard';
import DeleteAccountModalContent from '@/features/settings/components/DeleteAccountModalContent';

export const DeleteAccountCard = () => {
  const { showCustom } = useModal();
  const showModal = () => {
    showCustom({
      title: '회원 탈퇴',
      description: '정말로 회원을 탈퇴하시겠습니까?',
      size: 'md',
      titleAlign: 'center',
      content: <DeleteAccountModalContent />,
    });
  };

  return (
    <SettingsSectionCard
      title="회원 탈퇴"
      desc="탈퇴 시 모든 데이터가 삭제되며, 복구할 수 없습니다."
    >
      <Button variant="destructive" onClick={showModal} className="w-full md:w-auto">
        <UserX />
        <span className="label2-regular sm:label1-regular">
          회원 탈퇴<span className="inline md:hidden">하기</span>
        </span>
      </Button>
    </SettingsSectionCard>
  );
};
