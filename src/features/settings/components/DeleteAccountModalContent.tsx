import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import cryingBoo from '@/shared/assets/images/boost/boo-crying.png';
import { Button } from '@/shared/components/shadcn/button';
import { ApiError } from '@/shared/error/types/apiError.types';
import { getErrorMessage } from '@/shared/error/utils/error.utils';
import { useModal } from '@/shared/hooks/useModal';
import { useDeleteAccountMutation } from '@/features/settings/hooks/useDeleteAccountMutation';

const DeleteAccountModalContent = () => {
  const { resetModal } = useModal();
  const { mutateAsync: deleteAccount } = useDeleteAccountMutation();

  const handleDeleteAccountClick = async () => {
    try {
      await deleteAccount();
      resetModal();
    } catch (error) {
      if (error instanceof ApiError) toast.error(getErrorMessage(error));
      else toast.error('알 수 없는 오류가 발생했습니다.');
      resetModal();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <motion.img
        src={cryingBoo}
        alt="Boo"
        className="w-32 h-32 m-4 mt-5"
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="flex flex-col items-center justify-center space-y-2 w-full">
        <h2 className="title1-bold text-boost-blue">정말 떠나시겠어요? </h2>
        <p className="text-center label2-regular text-muted-foreground">
          부스트와 함께한 기록이 모두 사라져요.
          <br />
          정말로 계속 진행하시겠어요?
        </p>
        <div className="flex w-full gap-2 mt-3">
          <Button
            variant="outline"
            onClick={() => handleDeleteAccountClick()}
            className="flex-1 border-gray-300 hover:bg-gray-200 cursor-pointer"
          >
            떠나기
          </Button>
          <Button variant="defaultBoost" onClick={resetModal} className="flex-1">
            함께하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModalContent;
