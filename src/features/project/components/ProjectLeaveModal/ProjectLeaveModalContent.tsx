import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/app/routes/routePaths';
import { useModal } from '@/shared/hooks/useModal';
import { Button } from '@/shared/components/shadcn/button';
import MovingBoo from '@/shared/components/ui/MovingBoo';
import ProjectDeleteRotatingText from '@/features/project/components/ProjectDeleteModal/ProjectDeleteRotatingText';
import { useProjectStore } from '@/features/project/store/useProjectStore';
import { useLeaveProjectMutation } from '@/features/project/hooks/mutation/useLeaveProjectMutation';

const ProjectLeaveModalContent = () => {
  const projectData = useProjectStore((state) => state.projectData);
  const { resetModal, backModal } = useModal();
  const navigate = useNavigate();

  const { mutate: leaveProjectMutation, isPending } = useLeaveProjectMutation({
    onSuccess: () => {
      resetModal();
      navigate(ROUTE_PATH.MY_TASK);
      toast.success('프로젝트를 떠났습니다.');
    },
    onError: () => toast.error('프로젝트 떠나기를 실패했습니다.'),
  });

  if (!projectData)
    return (
      <div className="flex items-center justify-center py-8 label1-bold text-gray-500">
        떠날 프로젝트 정보가 없습니다.
      </div>
    );

  const handleProjectLeaveClick = () => leaveProjectMutation(projectData.id);

  return (
    <div className="flex flex-col items-center gap-4">
      <MovingBoo size={28} />
      <ProjectDeleteRotatingText />

      <div className="flex gap-2 mt-2 w-full">
        <Button
          variant="outline"
          onClick={backModal}
          className="flex-1 border-gray-300 hover:bg-gray-100"
          disabled={isPending}
        >
          취소
        </Button>

        {/* TODO: SmallLoader 컴포넌트 병합 후 적용 예정 */}
        <Button
          variant="defaultBoost"
          onClick={handleProjectLeaveClick}
          className="flex-1"
          disabled={isPending}
        >
          {isPending ? '떠나는 중...' : '떠나기'}
        </Button>
      </div>
    </div>
  );
};

export default ProjectLeaveModalContent;
