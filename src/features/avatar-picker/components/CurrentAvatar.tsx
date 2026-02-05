import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/shadcn/avatar';
import { User } from 'lucide-react';
import { getAvatarSrc } from '@/features/avatar-picker/utils/avatarUtils';
import { useAvatarStore } from '@/features/avatar-picker/store/useAvatarStore';

const CurrentAvatar = () => {
  const { selectedBgColor, selectedAvatarId } = useAvatarStore();
  return (
    <div className="relative bg-white rounded-full p-2 shadow-2xl">
      <Avatar
        style={{
          backgroundColor: selectedBgColor || '#f3f4f6',
        }}
        className="w-36 h-36 sm:w-60 sm:h-60 p-3 border-4 border-white shadow-xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        <AvatarImage
          loading="eager"
          fetchPriority="high"
          src={getAvatarSrc({ avatar: selectedAvatarId })}
          alt="Current avatar"
        />
        <AvatarFallback className="bg-gray-200">
          <User size={52} className="text-gray-500" />
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default CurrentAvatar;
