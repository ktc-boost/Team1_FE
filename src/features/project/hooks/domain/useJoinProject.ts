import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/app/routes/routeHelpers';
import { ERROR } from '@/shared/constants/errorTypes';
import { useModal } from '@/shared/hooks/useModal';
import { useJoinProjectMutation } from '@/features/project/hooks/mutation/useJoinProjectMutation';

export const useJoinProject = () => {
  const { resetModal } = useModal();
  const navigate = useNavigate();

  const { mutateAsync: joinProjectMutation } = useJoinProjectMutation({
    onSuccess: (project) => {
      toast.success('프로젝트에 참여했어요!');
      resetModal();
      navigate(ROUTES.PROJECT_BOARD(project.id));
    },

    onError: ({ type }) => {
      switch (type) {
        case ERROR.JOIN_CODE.NOT_FOUND.type:
          toast.error('참여 코드를 찾을 수 없습니다.');
          break;
        case ERROR.JOIN_CODE.EXPIRED.type:
          toast.error('만료된 참여 코드입니다.');
          break;
        case ERROR.MEMBER.ALREADY_JOINED.type:
          toast.error('이미 참여 중인 프로젝트입니다.');
          break;
        default:
          toast.error('프로젝트 참여에 실패했어요.');
      }
    },
  });

  return {
    joinProject: joinProjectMutation,
  };
};
