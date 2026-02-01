import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/app/routes/Router';
import AvatarHeader from '@/features/avatar-picker/components/AvatarHeader';
import AvatarSelector from '@/features/avatar-picker/components/AvatarSelector';
import AvatarInfo from '@/features/avatar-picker/components/AvatarInfo';
import AvatarSaveBtn from '@/features/avatar-picker/components/AvatarSaveBtn';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { useAvatarStore } from '@/features/avatar-picker/store/useAvatarStore';
import { useUpdateAvatarMutation } from '@/features/settings/hooks/useUpdateAvatarMutation';
import type { User } from '@/features/user/types/userTypes';

const AvatarSettingsPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const authUser = useAuthStore.getState().user;
  const { selectedAvatarId, selectedBgColor } = useAvatarStore();

  const { mutateAsync: updateAvatar } = useUpdateAvatarMutation();

  const handleSave = async () => {
    if (!selectedBgColor) {
      toast.error('배경색을 선택해주세요!');
      return;
    }

    if (!authUser) return;

    const avatarInfo = {
      avatar: selectedAvatarId,
      backgroundColor: selectedBgColor,
    };

    await updateAvatar(avatarInfo);
    const updatedUser: User = { ...authUser, ...avatarInfo };
    setAuth({ user: updatedUser });
    navigate(ROUTE_PATH.ALARM_SETUP, { state: { from: ROUTE_PATH.AVATAR } });
  };

  return (
    <div className="min-h-screen">
      <div className="relative mx-auto flex min-h-screen flex-col">
        <AvatarHeader />
        <div className="flex flex-1 flex-col justify-center">
          <AvatarSelector />
          <AvatarInfo />
        </div>
        <div className="pb-30  mx-auto">
          <AvatarSaveBtn handleSave={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default AvatarSettingsPage;
