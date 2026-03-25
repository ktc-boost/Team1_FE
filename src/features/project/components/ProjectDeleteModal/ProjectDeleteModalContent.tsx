import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/app/routes/routePaths';
import { useModal } from '@/shared/hooks/useModal';
import { Button } from '@/shared/components/shadcn/button';
import MovingBoo from '@/shared/components/ui/MovingBoo';
import { ApiError } from '@/shared/error/types/apiError.types';
import { getErrorMessage } from '@/shared/error/utils/error.utils';
import { useProjectStore } from '@/features/project/store/useProjectStore';
import { useDeleteProjectMutation } from '@/features/project/hooks/mutation/useDeleteProjectMutation';
import ProjectDeleteRotatingText from '@/features/project/components/ProjectDeleteModal/ProjectDeleteRotatingText';

const ProjectDeleteModalContent = () => {
  const projectData = useProjectStore((state) => state.projectData);
  const { resetModal, backModal } = useModal();
  const navigate = useNavigate();

  const { mutate: deleteProjectMutation, isPending } = useDeleteProjectMutation({
    onSuccess: () => {
      resetModal();
      toast.success('프로젝트가 삭제되었습니다.');
      navigate(ROUTE_PATH.MY_TASK);
    },
    onError: (error) => {
      if (error instanceof ApiError) toast.error(getErrorMessage(error));
      else toast.error('프로젝트 삭제를 실패했어요.');
    },
  });

  if (!projectData) {
    return (
      <div className="flex items-center justify-center py-8 label1-bold text-gray-500">
        삭제할 프로젝트 정보가 없습니다.
      </div>
    );
  }

  const handleDeleteProject = () => deleteProjectMutation(projectData.id);

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
          onClick={handleDeleteProject}
          className="flex-1"
          disabled={isPending}
        >
          {isPending ? '삭제 중...' : '삭제'}
        </Button>
      </div>
    </div>
  );
};

export default ProjectDeleteModalContent;
