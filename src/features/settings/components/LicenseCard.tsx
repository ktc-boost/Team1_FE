import { SettingsSectionCard } from '@/features/settings/components/SettingsSectionCard';

export const LicenseCard = () => (
  <SettingsSectionCard title="라이선스" desc="본 서비스는 다음 오픈소스 라이선스를 포함합니다.">
    <small>
      Avatars by Stefanie – Licensed under
      <a
        className="text-blue-400"
        href="https://creativecommons.org/licenses/by/4.0/"
        target="_blank"
        rel="noopener noreferrer"
      >
        CC BY 4.0
      </a>
    </small>
  </SettingsSectionCard>
);
