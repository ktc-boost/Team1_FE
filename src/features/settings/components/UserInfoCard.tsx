import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/shadcn/avatar';
import { Button } from '@/shared/components/shadcn/button';
import { Input } from '@/shared/components/shadcn/input';
import { getAvatarSrc } from '@/features/avatar-picker/utils/avatarUtils';
import { useUpdateNameMutation } from '@/features/settings/hooks/useUpdateNameMutation';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { SettingsSectionCard } from '@/features/settings/components/SettingsSectionCard';
import { useAvatarStore } from '@/features/avatar-picker/store/useAvatarStore';
import { Pencil } from 'lucide-react';

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
  const { mutate: updateName, isPending } = useUpdateNameMutation();
  const { openDrawer } = useAvatarStore();

  const handleNameSave = () => {
    if (!newName.trim()) {
      toast.error('이름을 입력해주세요.');
      return;
    }

    updateName(newName, {
      onSuccess: () => {
        setIsNameEditing(false);
      },
    });
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
        className="w-40 !body2-regular sm:body1-regular"
      />
      <Button size="sm" onClick={handleNameSave} disabled={isPending}>
        {isPending ? '저장 중...' : '저장'}
      </Button>
      <Button size="sm" variant="ghost" onClick={handleNameCancel}>
        취소
      </Button>
    </div>
  ) : (
    <p className="body2-regular sm:body1-regular">{member.name}</p>
  );

  return (
    <SettingsSectionCard title="내 정보" desc="아바타와 이름을 변경할 수 있어요.">
      <div className="hidden sm:flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Avatar
            style={{ backgroundColor: member.backgroundColor }}
            className="w-18 h-18 flex items-center justify-center"
          >
            <AvatarImage
              className="w-15 h-15 object-contain"
              src={getAvatarSrc(member)}
              alt="user avatar"
            />
            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
          </Avatar>

          {NameArea}
        </div>

        <div className="flex gap-3">
          <Button
            variant="defaultBoost"
            onClick={openDrawer}
            className="w-40 justify-center whitespace-nowrap"
          >
            <Pencil className="w-4 h-4" />
            아바타 변경
          </Button>
          <Button
            variant="defaultBoost"
            onClick={() => setIsNameEditing(true)}
            disabled={isNameEditing}
            className="w-40 justify-center whitespace-nowrap"
          >
            <Pencil className="w-4 h-4" />
            이름 변경
          </Button>
        </div>
      </div>

      <div className="sm:hidden">
        <div className="flex flex-col items-center gap-4 px-3 py-4 bg-gray-200 rounded-lg shadow-sm">
          <Avatar
            style={{ backgroundColor: member.backgroundColor }}
            className="w-20 h-20 flex items-center justify-center"
          >
            <AvatarImage
              className="w-16 h-16 object-contain"
              src={getAvatarSrc(member)}
              alt="user avatar"
            />
            <AvatarFallback className="text-xl">{member.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="w-full flex justify-center min-h-[40px]">{NameArea}</div>

          <div className="flex w-full gap-3">
            <Button
              variant="defaultBoost"
              onClick={openDrawer}
              className="flex-1 justify-center whitespace-nowrap"
            >
              <Pencil className="w-4 h-4" />
              아바타 변경
            </Button>
            <Button
              variant="defaultBoost"
              onClick={() => setIsNameEditing(true)}
              disabled={isNameEditing}
              className="flex-1 justify-center whitespace-nowrap"
            >
              <Pencil className="w-4 h-4" />
              이름 변경
            </Button>
          </div>
        </div>
      </div>
    </SettingsSectionCard>
  );
};
