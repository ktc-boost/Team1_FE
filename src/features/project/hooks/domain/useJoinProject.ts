import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/app/routes/routeHelpers';
import { getErrorMessage } from '@/shared/error/utils/error.utils';
import { useModal } from '@/shared/hooks/useModal';
import { useJoinProjectMutation } from '@/features/project/hooks/mutation/useJoinProjectMutation';
import type { ApiError } from '@/shared/error/types/apiError.types';

export const useJoinProject = () => {
  const { resetModal } = useModal();
  const navigate = useNavigate();

  const { mutateAsync: joinProjectMutation } = useJoinProjectMutation({
    onSuccess: (project) => {
      toast.success('프로젝트에 참여했어요!');
      resetModal();
      navigate(ROUTES.PROJECT_BOARD(project.id));
    },
    onError: (error: ApiError) => {
      toast.error(getErrorMessage(error));
    },
  });

  return {
    joinProject: joinProjectMutation,
  };
};
