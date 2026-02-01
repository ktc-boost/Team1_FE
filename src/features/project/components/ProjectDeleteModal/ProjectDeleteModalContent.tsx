import { useProjectStore } from '@/features/project/store/useProjectStore';
import { useDeleteProjectMutation } from '@/features/project/hooks/mutation/useDeleteProjectMutation';
import { useModal } from '@/shared/hooks/useModal';
import { ROUTE_PATH } from '@/app/routes/Router';
import { type NavigateFunction } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button } from '@/shared/components/shadcn/button';
import ProjectDeleteRotatingText from '@/features/project/components/ProjectDeleteModal/ProjectDeleteRotatingText';
import MovingBoo from '@/shared/components/ui/MovingBoo';

interface ProjectDeleteModalContentProps {
  navigate: NavigateFunction;
}

const ProjectDeleteModalContent = ({ navigate }: ProjectDeleteModalContentProps) => {
  const projectData = useProjectStore((state) => state.projectData);
  const { resetModal, backModal } = useModal();
  const { mutateAsync: deleteProject } = useDeleteProjectMutation();

  if (!projectData) return null;

  const handleDeleteConfirm = async () => {
    try {
      await deleteProject(projectData.id);
      resetModal();
      navigate(ROUTE_PATH.MY_TASK);
      toast.success('프로젝트가 삭제되었습니다.');
    } catch (error) {
      toast.error(
        `프로젝트 삭제 실패: ${error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'}`,
      );
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <MovingBoo size={28} />
      <ProjectDeleteRotatingText />
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
          onClick={handleDeleteConfirm}
          className="flex-1 bg-boost-blue hover:bg-boost-blue-pressed text-gray-100"
        >
          삭제
        </Button>
      </div>
    </div>
  );
};

export default ProjectDeleteModalContent;
