import { UserIcon } from 'lucide-react';
import { getAvatarSrc } from '@/features/avatar-picker/utils/avatarUtils';
import type { User } from '@/features/user/types/userTypes';

interface UseAvatarProps {
  user: User | null;
}

const UserAvatar = ({ user }: UseAvatarProps) => {
  if (!user) return <UserIcon className="w-6 h-6 text-white" strokeWidth={2} />;

  return (
    <img
      src={getAvatarSrc({ avatar: user.avatar })}
      alt="user avatar"
      className="w-8 h-8 object-cover"
    />
  );
};

export default UserAvatar;
