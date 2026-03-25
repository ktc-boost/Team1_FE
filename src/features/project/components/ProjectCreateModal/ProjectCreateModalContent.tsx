import { useState } from 'react';
import { Input } from '@/shared/components/shadcn/input';
import { Button } from '@/shared/components/shadcn/button';
import { DialogFooter } from '@/shared/components/shadcn/dialog';
import useModalStore from '@/shared/store/useModalStore';

interface ProjectCreateModalProps {
  onConfirm: (projectName: string) => Promise<void> | void;
  onJoinClick: () => void;
}

const ProjectCreateModalContent = ({ onConfirm, onJoinClick }: ProjectCreateModalProps) => {
  const [projectName, setProjectName] = useState('');
  const { resetModal, backModal, stack } = useModalStore();
  const isLoading = stack[stack.length - 1]?.isLoading ?? false;

  const handleConfirm = async () => {
    await onConfirm(projectName);
  };

  return (
    <>
      <div className="py-4">
        <Input
          id="projectName"
          value={projectName}
          placeholder="프로젝트 이름을 입력해주세요."
          onChange={(e) => setProjectName(e.target.value)}
          disabled={isLoading}
          className="border-gray-400 h-10 focus:ring-transparent focus:border-gray-600"
        />
      </div>
      <DialogFooter className="!mt-0 pt-4 border-t border-gray-300 flex flex-col-reverse sm:flex-row sm:justify-between items-stretch sm:items-center gap-4">
        <Button
          onClick={() => {
            resetModal();
            onJoinClick();
          }}
          variant="outline"
          disabled={isLoading}
          className="border-none text-gray-500 p-1 underline hover:text-gray-600 hover:bg-gray-100"
        >
          참여할래요
        </Button>

        <div className="flex flex-col-reverse sm:flex-row gap-2 w-full sm:w-auto">
          <Button
            onClick={backModal}
            variant="outline"
            disabled={isLoading}
            className="border-gray-400 w-full sm:w-20 hover:bg-gray-200"
          >
            취소
          </Button>

          <Button
            onClick={handleConfirm}
            disabled={!projectName.trim() || isLoading}
            className="bg-boost-blue w-full sm:w-20 hover:bg-boost-blue-pressed"
          >
            생성
          </Button>
        </div>
      </DialogFooter>
    </>
  );
};

export default ProjectCreateModalContent;
