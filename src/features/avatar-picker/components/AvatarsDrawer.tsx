import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Check, Pen, X } from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/components/shadcn/drawer';
import { Button } from '@/shared/components/shadcn/button';
import { getErrorMessage } from '@/shared/error/utils/error.utils';
import { ApiError } from '@/shared/error/types/apiError.types';
import { useAvatarStore } from '@/features/avatar-picker/store/useAvatarStore';
import { useUpdateAvatarMutation } from '@/features/settings/hooks/useUpdateAvatarMutation';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import BackgroundGrid from '@/features/avatar-picker/components/BackgroundGrid';
import AvatarGrid from '@/features/avatar-picker/components/AvatarGrid';
import { avatarBgColors } from '@/features/avatar-picker/constants/avatar.ui.constants';

interface AvatarsDrawerProps {
  showEditButton?: boolean;
  showSaveButton?: boolean;
}

const AvatarsDrawer = ({ showEditButton = true, showSaveButton }: AvatarsDrawerProps) => {
  const { mutateAsync: updateAvatar } = useUpdateAvatarMutation();
  const user = useAuthStore((s) => s.user);
  const [initialized, setInitialized] = useState(false);

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
    if (!user || initialized) return;

    setAvatarId(user.avatar ?? '');
    setBgColor(user.backgroundColor ?? '');
    setInitialized(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, initialized]);

  useEffect(() => {
    setInitialized(false);
  }, [user?.avatar, user?.backgroundColor]);

  const handleSaveAvatar = async () => {
    if (!selectedAvatarId || !selectedBgColor) {
      toast.error('아바타와 배경색을 모두 선택해주세요!');
      return;
    }

    try {
      await updateAvatar({ avatar: selectedAvatarId, backgroundColor: selectedBgColor });
      closeDrawer();
      toast.success('아바타가 성공적으로 수정되었습니다!');
    } catch (error) {
      if (error instanceof ApiError) toast.error(getErrorMessage(error));
      else toast.error('아바타 수정을 실패했어요.');
    }
  };

  const handleOpenChange = (open: boolean) => (open ? openDrawer() : closeDrawer());

  return (
    <Drawer open={isDrawerOpen} onOpenChange={handleOpenChange}>
      {showEditButton && (
        <DrawerTrigger asChild>
          <Button
            variant="defaultBoost"
            size="icon-lg"
            className="absolute -bottom-2 -right-2 p-4 sm:p-7 shadow-lg rounded-full"
            aria-label="아바타 변경"
          >
            <Pen className="!h-4 !w-4 sm:!h-5 sm:!w-5" />
            <span className="absolute inset-0 bg-white rounded-full opacity-20 pointer-events-none" />
          </Button>
        </DrawerTrigger>
      )}

      <DrawerContent className="max-h-[95vh] border-gray-300">
        <DrawerHeader className="pt-8 pb-4 text-center border-b border-gray-100">
          <DrawerTitle className="!title2-bold sm:!title1-bold text-gray-800 mb-2">
            아바타 선택
          </DrawerTitle>
          <DrawerDescription className="!body2-regular text-gray-600 sm:!body1-regular">
            아바타와 배경색상을 골라보세요!
          </DrawerDescription>
        </DrawerHeader>

        <BackgroundGrid
          avatarBgColors={avatarBgColors}
          setBgColor={setBgColor}
          selectedBgColor={selectedBgColor}
        />

        <AvatarGrid
          selectedAvatarId={selectedAvatarId}
          hoveredIndex={hoveredIndex}
          setAvatarId={setAvatarId}
          setHoveredIndex={setHoveredIndex}
          selectedBgColor={selectedBgColor}
        />

        {showSaveButton ? (
          <div className="absolute top-2 left-0 right-2 flex justify-end px-6 py-4 bg-transparent">
            <Button
              variant="defaultBoost"
              onClick={handleSaveAvatar}
              disabled={!selectedAvatarId || !selectedBgColor}
              className="rounded-full w-12 h-12"
            >
              <Check className="w-9 h-9" />
            </Button>
          </div>
        ) : (
          <div className="absolute top-2 left-0 right-2 flex justify-end px-6 py-4">
            <DrawerClose asChild>
              <Button variant="defaultBoost" className="rounded-full w-10 h-10 ">
                <X className="w-9 h-9 text-white" />
              </Button>
            </DrawerClose>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default AvatarsDrawer;
