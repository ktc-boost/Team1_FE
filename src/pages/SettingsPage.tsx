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
    <div className="overflow-y-auto">
      <nav className="flex justify-between items-center w-full bg-gray-100 border-b border-gray-300 h-14 px-4">
        <div className="subtitle2-bold sm:title1-bold flex items-center gap-3">
          <BackButton />

          <p>설정</p>
        </div>
      </nav>
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
