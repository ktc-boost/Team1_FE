import AvatarsDrawer from '@/features/avatar-picker/components/AvatarsDrawer';
import { DeleteAccountCard } from '@/features/settings/components/DeleteAccountCard';
import { LicenseCard } from '@/features/settings/components/LicenseCard';
import { useMyInfoQuery } from '@/features/settings/hooks/useMyInfoQuery';
import { Separator } from '@/shared/components/shadcn/separator';
import AlarmSettingCard from '@/features/settings/components/AlarmSettingCard';
import { UserInfoCard } from '@/features/settings/components/UserInfoCard';
import FullPageLoader from '@/shared/components/ui/loading/FullPageLoader';

export default function SettingsPage() {
  const { data: myInfo, isLoading } = useMyInfoQuery();

  if (isLoading || !myInfo) return <FullPageLoader text="정보 불러오는 중.." />;

  return (
    <div className="overflow-y-auto bg-gray-200">
      <div className="flex flex-col p-4 md:p-5 space-y-4">
        <UserInfoCard member={myInfo} />
        <AvatarsDrawer showEditButton={false} showSaveButton={true} />
        <Separator className="bg-gray-300" />
        <AlarmSettingCard />
        <Separator className="bg-gray-300" />
        <DeleteAccountCard />
        <Separator className="bg-gray-300" />
        <LicenseCard />
      </div>
    </div>
  );
}
