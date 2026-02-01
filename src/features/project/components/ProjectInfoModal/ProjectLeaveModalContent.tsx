import { useProjectStore } from '@/features/project/store/useProjectStore';
import { useModal } from '@/shared/hooks/useModal';
import { ROUTE_PATH } from '@/app/routes/Router';
import { type NavigateFunction } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button } from '@/shared/components/shadcn/button';
import MovingBoo from '@/shared/components/ui/MovingBoo';
import { useLeaveProjectMutation } from '@/features/project/hooks/mutation/useLeaveProjectMutation';

interface ProjectLeaveModalContentProps {
  navigate: NavigateFunction;
}

const ProjectLeaveModalContent = ({ navigate }: ProjectLeaveModalContentProps) => {
  const projectData = useProjectStore((state) => state.projectData);
  const { resetModal, backModal } = useModal();
  const { mutateAsync: leaveMutation } = useLeaveProjectMutation();

  if (!projectData) return null;

  const handleLeaveConfirm = async () => {
    try {
      await leaveMutation(projectData.id);
      resetModal();
      navigate(ROUTE_PATH.MY_TASK);
      toast.success('프로젝트를 떠났습니다.');
    } catch (error) {
      toast.error(
        `프로젝트 떠나기 실패: ${error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'}`,
      );
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <MovingBoo size={28} />
      <div className="flex gap-2 mt-2 w-full">
        <Button
          variant="outline"
          onClick={backModal}
          className="flex flex-1 border-gray-300 hover:bg-gray-100"
        >
          취소
        </Button>
        <Button
          variant="destructive"
          onClick={handleLeaveConfirm}
          className="flex-1 bg-boost-blue hover:bg-boost-blue-pressed text-gray-100"
        >
          떠나기
        </Button>
      </div>
    </div>
  );
};

export default ProjectLeaveModalContent;
