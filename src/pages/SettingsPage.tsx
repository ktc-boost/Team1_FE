import AvatarsDrawer from '@/features/avatar-picker/components/AvatarsDrawer';
import { DeleteAccountCard } from '@/features/settings/components/DeleteAccountCard';
import { LicenseCard } from '@/features/settings/components/LicenseCard';
import { useMyInfoQuery } from '@/features/settings/hooks/useMyInfoQuery';
import { Separator } from '@/shared/components/shadcn/separator';

import AlarmSettingCard from '@/features/settings/components/AlarmSettingCard';
import { UserInfoCard } from '@/features/settings/components/UserInfoCard';
import FullPageLoader from '@/shared/components/ui/loading/FullPageLoader';
import BackButton from '@/shared/components/ui/BackButton';

export default function SettingsPage() {
  const { data: myInfo, isLoading } = useMyInfoQuery();

  if (isLoading || !myInfo) return <FullPageLoader text="정보 불러오는 중.." />;

  return (
    <div>
      <div className="p-5 flex items-center gap-2">
        <BackButton className="shrink-0" />
        <h1 className="title1-bold leading-none">알림 설정</h1>
      </div>

      <div className="flex flex-col px-2 sm:px-10 space-y-4 overflow-y-auto">
        {/* 내 정보 */}
        <UserInfoCard member={myInfo} />
        <AvatarsDrawer showEditButton={false} showConfirmButton={true} />
        <Separator />
        {/* 알림변경 */}
        <AlarmSettingCard />
        <Separator />
        {/* 회원탈퇴 */}
        <DeleteAccountCard />
        <Separator />
        {/* 라이선스 명시 */}
        <LicenseCard />
      </div>
    </div>
  );
}
