import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/shadcn/avatar';
import { Button } from '@/shared/components/shadcn/button';
import { Input } from '@/shared/components/shadcn/input';
import { getAvatarSrc } from '@/features/avatar-picker/utils/avatarUtils';
import { useUpdateNameMutation } from '@/features/settings/hooks/useUpdateNameMutation';
import toast from 'react-hot-toast';
import { useState } from 'react';
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

  return (
    <SettingsSectionCard title="내 정보">
      <div className="flex items-center gap-4">
        <Avatar
          style={{ backgroundColor: member.backgroundColor }}
          className="w-15 h-15 sm:w-18 sm:h-18 flex items-center justify-center"
        >
          <AvatarImage
            className="w-12 h-12 sm:w-15 sm:h-15"
            src={getAvatarSrc(member)}
            alt="user avatar"
          />
          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
        </Avatar>

        {isNameEditing ? (
          <div className="flex items-center gap-2">
            <Input value={newName} onChange={(e) => setNewName(e.target.value)} className="w-40" />
            <Button size="sm" onClick={handleNameSave} disabled={isPending}>
              {isPending ? '저장 중...' : '저장'}
            </Button>
            <Button size="sm" variant="ghost" onClick={handleNameCancel}>
              취소
            </Button>
          </div>
        ) : (
          <p className="body2-regular sm:body1-regular">{member.name}</p>
        )}
      </div>

      <div className="flex gap-3">
        <Button variant="secondary" onClick={() => setIsNameEditing(true)} disabled={isNameEditing}>
          이름 변경
        </Button>

        <Button onClick={openDrawer} variant="secondary">
          아바타 변경
        </Button>
      </div>
    </SettingsSectionCard>
  );
};
