import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTE_PATH } from '@/app/routes/routePaths';
import AvatarHeader from '@/features/avatar-picker/components/AvatarHeader';
import AvatarSelector from '@/features/avatar-picker/components/AvatarSelector';
import AvatarInfo from '@/features/avatar-picker/components/AvatarInfo';
import AvatarSaveButton from '@/features/avatar-picker/components/AvatarSaveButton';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { useAvatarStore } from '@/features/avatar-picker/store/useAvatarStore';
import { useUpdateAvatarMutation } from '@/features/settings/hooks/useUpdateAvatarMutation';
import type { User } from '@/features/user/types/userTypes';
import {
  DEFAULT_AVATAR_ID,
  DEFAULT_BG_COLOR,
} from '@/features/avatar-picker/constants/avatar.ui.constants';
import { ApiError } from '@/shared/error/types/apiError.types';
import { getErrorMessage } from '@/shared/error/utils/error.utils';

const AvatarSettingsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isNewUser = location.state?.isNewUser ?? false;

  const setAuth = useAuthStore((s) => s.setAuth);
  const authUser = useAuthStore((s) => s.user);

  const { selectedAvatarId, selectedBgColor, setAvatarId, setBgColor } = useAvatarStore();

  const { mutateAsync: updateAvatar } = useUpdateAvatarMutation();

  useEffect(() => {
    if (!authUser) return;

    setAvatarId(authUser.avatar ?? '');
    setBgColor(authUser.backgroundColor ?? '');
  }, [authUser, setAvatarId, setBgColor]);

  useEffect(() => {
    if (!isNewUser) return;
    if (!selectedAvatarId) setAvatarId(DEFAULT_AVATAR_ID);
    if (!selectedBgColor) setBgColor(DEFAULT_BG_COLOR);
  }, [isNewUser, selectedAvatarId, selectedBgColor, setAvatarId, setBgColor]);

  const handleSaveAvatar = async () => {
    if (!authUser) return;

    const avatarInfo = {
      avatar: selectedAvatarId ?? DEFAULT_AVATAR_ID,
      backgroundColor: selectedBgColor ?? DEFAULT_BG_COLOR,
    };

    if (!isNewUser) {
      if (!selectedBgColor) {
        toast.error('배경색을 선택해주세요!');
        return;
      }

      if (!selectedAvatarId) {
        toast.error('아바타를 선택해주세요!');
        return;
      }
    }

    try {
      await updateAvatar(avatarInfo);

      const updatedUser: User = { ...authUser, ...avatarInfo };
      setAuth({ user: updatedUser });

      toast.success('아바타가 성공적으로 설정되었습니다!');

      navigate(ROUTE_PATH.ALARM_SETUP, {
        state: { from: ROUTE_PATH.AVATAR },
      });
    } catch (error) {
      if (error instanceof ApiError) toast.error(getErrorMessage(error));
      else toast.error('아바타 설정을 실패했어요.');
    }
  };

  return (
    <div className="h-dvh flex flex-col">
      <AvatarHeader />

      <div className="flex flex-1 flex-col justify-center overflow-y-auto">
        <AvatarSelector />
        <AvatarInfo />
      </div>

      <div className="pb-6 flex mx-auto sm:pb-20">
        <AvatarSaveButton onSaveAvatar={handleSaveAvatar} />
      </div>
    </div>
  );
};

export default AvatarSettingsPage;
