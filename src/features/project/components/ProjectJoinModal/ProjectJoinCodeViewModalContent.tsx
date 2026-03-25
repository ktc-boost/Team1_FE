import toast from 'react-hot-toast';
import { Copy, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/shared/components/shadcn/button';
import { DialogFooter } from '@/shared/components/shadcn/dialog';
import useModalStore from '@/shared/store/useModalStore';
import { ApiError } from '@/shared/error/types/apiError.types';
import { getErrorMessage } from '@/shared/error/utils/error.utils';
import { formatSecondsToHHMMSS, getRemainingSeconds } from '@/shared/utils/dateUtils';
import { useJoinCode } from '@/features/project/hooks/domain/useJoinCode';
import { useCreateJoinCodeMutation } from '@/features/project/hooks/mutation/useCreateJoinCodeMutation';

interface ProjectJoinCodeViewModalContentProps {
  projectId: string;
}

const ProjectJoinCodeViewModalContent = ({ projectId }: ProjectJoinCodeViewModalContentProps) => {
  const { joinCode, expiresAt, loading, loadJoinCode } = useJoinCode(projectId);
  const { mutate: createJoinCode } = useCreateJoinCodeMutation(projectId);
  const { resetModal } = useModalStore();
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (!expiresAt) {
      setRemainingTime(null);
      return;
    }

    const updateRemainingTime = () => setRemainingTime(getRemainingSeconds(expiresAt));
    updateRemainingTime();

    const interval = setInterval(updateRemainingTime, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  const handleCopy = async () => {
    if (!joinCode) return;
    try {
      await navigator.clipboard.writeText(joinCode);
      toast.success('참여 코드가 복사되었습니다!');
    } catch (error) {
      toast.error('복사에 실패했습니다.');
      console.error('참여 코드 복사 실패:', error);
    }
  };

  const handleRefresh = async () => {
    setIsCreating(true);
    try {
      createJoinCode(undefined, {
        onSuccess: () => {
          loadJoinCode();
          toast.success('새 참여 코드가 발급되었습니다!');
        },
        onError: (error) => {
          if (error instanceof ApiError) toast.error(getErrorMessage(error));
          else toast.error('참여 코드 재발급을 실패했어요.');
        },
        onSettled: () => {
          setIsCreating(false);
        },
      });
    } catch {
      setIsCreating(false);
      toast.error('예상치 못한 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <div className="py-4 flex flex-col gap-3">
        {loading ? (
          <p>참여 코드를 불러오는 중입니다!</p>
        ) : joinCode ? (
          <>
            <div className="flex items-center justify-between">
              <p className="subtitle1-bold">참여 코드</p>
              <div className="flex items-center gap-2">
                <span className="subtitle2-regular">{joinCode}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                  복사
                </Button>
              </div>
            </div>

            {remainingTime !== null && (
              <p className="label2-regular text-gray-500">
                참여 코드 만료 D-{formatSecondsToHHMMSS(Math.max(remainingTime, 0))}
              </p>
            )}
          </>
        ) : (
          <p className="text-red-500">참여 코드를 불러올 수 없습니다.</p>
        )}
      </div>

      <DialogFooter className="flex w-full !justify-between gap-2">
        <Button
          variant="link"
          onClick={handleRefresh}
          disabled={isCreating}
          className="cursor-pointer flex items-center gap-1 !pl-0 text-gray-600"
        >
          <RefreshCw className="w-4 h-4" />
          {isCreating ? '참여 코드 재발급 중...' : '참여 코드 재발급'}
        </Button>
        <Button variant="defaultBoost" onClick={resetModal}>
          닫기
        </Button>
      </DialogFooter>
    </>
  );
};

export default ProjectJoinCodeViewModalContent;
