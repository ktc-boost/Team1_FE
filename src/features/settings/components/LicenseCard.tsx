import { SettingsSectionCard } from '@/features/settings/components/SettingsSectionCard';
import { EXTERNAL_LINKS } from '@/shared/constants/external-links';

export const LicenseCard = () => (
  <SettingsSectionCard
    title="저작권 및 라이선스"
    desc="서비스에 사용된 이미지 및 리소스의 출처와 라이선스를 확인할 수 있습니다."
  >
    <small>
      Avatars from{' '}
      <a
        className="text-blue-400"
        href={EXTERNAL_LINKS.AVATAR_SOURCE_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        3D Funky Avatar Illustrations
      </a>{' '}
      by{' '}
      <a
        className="text-blue-400"
        href={EXTERNAL_LINKS.AVATAR_AUTHOR_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Stefanie
      </a>
      , licensed under{' '}
      <a
        className="text-blue-400"
        href={EXTERNAL_LINKS.CC_BY_4_LICENSE_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        CC BY 4.0
      </a>
    </small>
  </SettingsSectionCard>
);
