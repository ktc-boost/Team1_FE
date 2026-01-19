import { useState } from 'react';
import { Input } from '@/shared/components/shadcn/input';
import { Button } from '@/shared/components/shadcn/button';
import { DialogFooter } from '@/shared/components/shadcn/dialog';
import useModalStore from '@/shared/store/useModalStore';
import { isAxiosError } from 'axios';
import { ERROR } from '@/shared/constants/errorTypes';
import toast from 'react-hot-toast';

interface ProjectJoinCodeInputModalProps {
  onConfirm: (joinCode: string) => Promise<void>;
  onCreateClick: () => void;
}

const ProjectJoinCodeInputModalContent = ({
  onConfirm,
  onCreateClick,
}: ProjectJoinCodeInputModalProps) => {
  const [joinCode, setJoinCode] = useState('');
  const { resetModal, setLoading, backModal, stack } = useModalStore();
  const isLoading = stack[stack.length - 1]?.isLoading ?? false;

  const handleConfirm = async () => {
    if (!joinCode) return;
    setLoading(true);

    try {
      await onConfirm(joinCode);
      toast.success('프로젝트에 성공적으로 참여했습니다!');
    } catch (error) {
      if (isAxiosError(error)) {
        const type = error.response?.data?.type;

        switch (type) {
          case ERROR.JOIN_CODE.NOT_FOUND.type:
            toast.error('참여 코드를 찾을 수 없습니다.');
            break;
          case ERROR.MEMBER.ALREADY_JOINED.type:
            toast.error('이미 참여하고 있는 프로젝트입니다.');
            break;
          default:
            toast.error('잘못된 참여 코드입니다.');
        }
      } else {
        toast.error('알 수 없는 오류가 발생했습니다.');
        console.error(error);
      }
    } finally {
      setLoading(false);
      resetModal();
    }
  };

  return (
    <>
      <div className="py-4">
        <Input
          id="joinCode"
          value={joinCode}
          placeholder="참여코드를 입력해주세요."
          onChange={(e) => setJoinCode(e.target.value)}
          disabled={isLoading}
          className="border-gray-400 h-10 focus:ring-transparent focus:border-gray-600"
        />
      </div>
      <DialogFooter className="!mt-0 pt-4 border-t border-gray-300 flex flex-col-reverse sm:flex-row sm:justify-between gap-4">
        <Button
          onClick={() => {
            resetModal();
            onCreateClick();
          }}
          variant="outline"
          disabled={isLoading}
          className="border-none text-gray-500 p-1 hover:text-gray-600 underline cursor-pointer hover:bg-gray-100"
        >
          생성할래요
        </Button>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button
            onClick={backModal}
            variant="outline"
            disabled={isLoading}
            className="border-gray-400 w-full sm:w-20 hover:bg-gray-200 cursor-pointer order-2 sm:order-1"
          >
            취소
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!joinCode || isLoading}
            className="bg-boost-blue w-full sm:w-20 hover:bg-boost-blue-pressed cursor-pointer order-1 sm:order-2"
          >
            참여
          </Button>
        </div>
      </DialogFooter>
    </>
  );
};

export default ProjectJoinCodeInputModalContent;
