import { useState } from 'react';
import toast from 'react-hot-toast';
import { Pencil } from 'lucide-react';
import { getErrorMessage } from '@/shared/error/utils/error.utils';
import { ApiError } from '@/shared/error/types/apiError.types';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/shadcn/avatar';
import { Button } from '@/shared/components/shadcn/button';
import { Input } from '@/shared/components/shadcn/input';
import { getAvatarSrc } from '@/features/avatar-picker/utils/avatarUtils';
import { useUpdateNameMutation } from '@/features/settings/hooks/useUpdateNameMutation';
import { SettingsSectionCard } from '@/features/settings/components/SettingsSectionCard';
import { useAvatarStore } from '@/features/avatar-picker/store/useAvatarStore';

interface UserInfoProps {
  name: string;
  avatar: string;
  backgroundColor: string;
}

interface UserInfoComponentProps {
  member: UserInfoProps;
}

export const UserInfoCard = ({ member }: UserInfoComponentProps) => {
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [newName, setNewName] = useState(member.name);
  const { mutateAsync: updateNameAsync, isPending } = useUpdateNameMutation();
  const { openDrawer } = useAvatarStore();

  const handleNameSave = async () => {
    if (!newName.trim()) {
      toast.error('이름을 입력해주세요.');
      return;
    }

    try {
      await updateNameAsync(newName);
      toast.success('이름이 변경되었습니다!');
      setIsNameEditing(false);
    } catch (error) {
      if (error instanceof ApiError) toast.error(getErrorMessage(error));
      else toast.error('알 수 없는 오류가 발생했습니다.');
    }
  };

  const handleNameCancel = () => {
    setNewName(member.name);
    setIsNameEditing(false);
  };

  const NameArea = isNameEditing ? (
    <div className="flex items-center gap-2">
      <Input
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        className="w-40 !body2-regular sm:!body1-regular focus:ring-transparent focus:border-gray-400"
      />
      <Button size="sm" variant="defaultBoost" onClick={handleNameSave} disabled={isPending}>
        {isPending ? '저장 중...' : '저장'}
      </Button>
      <Button size="sm" variant="outline" className="border-gray-400" onClick={handleNameCancel}>
        취소
      </Button>
    </div>
  ) : (
    <p className="body1-regular">{member.name}</p>
  );

  return (
    <SettingsSectionCard title="내 정보" desc="아바타와 이름을 변경할 수 있습니다.">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 px-3 py-4 md:px-0 md:py-0">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Avatar
            style={{ backgroundColor: member.backgroundColor }}
            className="flex items-center justify-center w-24 h-24 md:w-18 md:h-18 shadow-sm"
          >
            <AvatarImage
              className="object-contain w-18 h-18 md:w-15 md:h-15"
              src={getAvatarSrc(member)}
              alt="user avatar"
            />
            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="min-h-[40px] flex items-center justify-center md:justify-start">
            {NameArea}
          </div>
        </div>

        <div className="flex w-full md:w-auto gap-3">
          <Button variant="defaultBoost" onClick={openDrawer} className="flex-1 md:w-40">
            <Pencil className="w-4 h-4" />
            <span className="label2-regular sm:label1-regular">아바타 변경</span>
          </Button>

          <Button
            variant="defaultBoost"
            onClick={() => setIsNameEditing(true)}
            disabled={isNameEditing}
            className="flex-1 md:w-40"
          >
            <Pencil className="w-4 h-4" />
            <span className="label2-regular sm:label1-regular">이름 변경</span>
          </Button>
        </div>
      </div>
    </SettingsSectionCard>
  );
};
