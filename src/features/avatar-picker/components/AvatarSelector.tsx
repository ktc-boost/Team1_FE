import CurrentAvatar from '@/features/avatar-picker/components/CurrentAvatar';
import AvatarsDrawer from '@/features/avatar-picker/components/AvatarsDrawer';

const AvatarSelector = () => {
  return (
    <div className="flex flex-col items-center space-y-6 pt-6 sm:pt-10">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-boost-orange via-boost-blue to-purple-500 rounded-full blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300 scale-110" />
        <CurrentAvatar />
        <AvatarsDrawer showSaveButton={false} />
      </div>
    </div>
  );
};

export default AvatarSelector;
