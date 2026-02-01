import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/components/shadcn/drawer';
import { Check, Pen } from 'lucide-react';
import { AVATAR_BG_COLOR } from '@/features/avatar-picker/constants/avatarBgColor';
import { useAvatarStore } from '@/features/avatar-picker/store/useAvatarStore';
import toast from 'react-hot-toast';
import { useUpdateAvatarMutation } from '@/features/settings/hooks/useUpdateAvatarMutation';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { Button } from '@/shared/components/shadcn/button';
import BackgroundGrid from '@/features/avatar-picker/components/BackgroundGrid';
import AvatarGrid from '@/features/avatar-picker/components/AvatarGrid';

const avatarBgColors = Object.values(AVATAR_BG_COLOR);

interface AvatarsDrawerProps {
  showEditButton?: boolean;
  showConfirmButton?: boolean;
}

const AvatarsDrawer = ({ showEditButton = true, showConfirmButton }: AvatarsDrawerProps) => {
  const { mutate: updateAvatar } = useUpdateAvatarMutation();
  const { user } = useAuthStore();

  const {
    selectedAvatarId,
    selectedBgColor,
    setAvatarId,
    setBgColor,
    isDrawerOpen,
    openDrawer,
    closeDrawer,
  } = useAvatarStore();

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isDrawerOpen && user) {
      setAvatarId(user.avatar ?? '');
      setBgColor(user.backgroundColor ?? '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDrawerOpen, user?.avatar, user?.backgroundColor]);

  const handleConfirm = async () => {
    if (!selectedAvatarId || !selectedBgColor) {
      toast.error('아바타와 배경색을 모두 선택해주세요!');
      return;
    }

    try {
      updateAvatar({ avatar: selectedAvatarId, backgroundColor: selectedBgColor });
      closeDrawer();
      toast.success('아바타가 성공적으로 업데이트되었습니다!');
    } catch (error) {
      console.log('아바타 업데이트 실패', error);
      toast.error('아바타 업데이트에 실패했습니다 😢');
    }
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={(open) => (open ? openDrawer() : closeDrawer())}>
      {showEditButton && (
        <DrawerTrigger asChild>
          <button
            type="button"
            className="absolute -bottom-2 -right-2 bg-boost-blue hover:bg-boost-blue-hover text-white p-4 rounded-full shadow-lg focus:boost-blue/30 cursor-pointer"
            aria-label="아바타 변경"
          >
            <Pen className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="absolute inset-0 bg-white rounded-full opacity-20 pointer-events-none" />
          </button>
        </DrawerTrigger>
      )}

      <DrawerContent className="max-h-[95vh] border-gray-300">
        <DrawerHeader className="pt-8 pb-4 text-center border-b border-gray-100">
          <DrawerTitle className="title2-bold sm:title1-bold font-bold text-gray-800 mb-2">
            아바타 선택
          </DrawerTitle>
          <DrawerDescription className="body2-regular text-gray-600 sm:body1-regular">
            아바타와 배경색상을 골라보세요!
          </DrawerDescription>
        </DrawerHeader>

        {/* 배경색 그리드 */}
        <BackgroundGrid
          avatarBgColors={avatarBgColors}
          setBgColor={setBgColor}
          selectedBgColor={selectedBgColor}
        />
        {/* 아바타 그리드 */}
        <AvatarGrid
          selectedAvatarId={selectedAvatarId}
          hoveredIndex={hoveredIndex}
          setAvatarId={setAvatarId}
          setHoveredIndex={setHoveredIndex}
          selectedBgColor={selectedBgColor}
        />

        {showConfirmButton && selectedAvatarId && selectedBgColor && (
          <div className="absolute top-2 left-0 right-2 flex justify-end px-6 py-4 bg-transparent">
            <Button
              variant="defaultBoost"
              onClick={handleConfirm}
              className="rounded-full w-12 h-12 shadow-md"
            >
              <Check className="w-9 h-9" />
            </Button>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default AvatarsDrawer;
