import { AVATAR_BG_COLOR } from '@/features/avatar-picker/constants/avatarBgColor';
const LCP_AVATAR_PUBLIC_URL = '/avatars/01.webp';

type AvatarModule = { default: string };

const avatarModules = import.meta.glob<AvatarModule>('@/shared/assets/images/avatars/*.webp', {
  eager: true,
});
const sortedAvatars = Object.entries(avatarModules)
  .sort(([pathA], [pathB]) => {
    const getNum = (path: string) => {
      const matches = path.match(/\d+(?=\.webp$)/g);
      return matches ? parseInt(matches[matches.length - 1], 10) : 0;
    };

    const numA = getNum(pathA);
    const numB = getNum(pathB);
    return numA - numB;
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .map(([_, module]) => {
    return module.default;
  });
export const avatarList = ['/avatars/01.webp', ...sortedAvatars.slice(2)];
export const getAvatarListUtils = () => avatarList;

export const getRandomAvatarId = () => {
  const randomIndex = Math.floor(Math.random() * avatarList.length);
  return String(randomIndex);
};
export const getAvatarSrc = (
  member: { avatar?: string | number } | undefined,
  propsAvatarList: string[] = avatarList,
) => {
  if (!member) return LCP_AVATAR_PUBLIC_URL;

  const index = Number(member.avatar);

  if (index === 0) return LCP_AVATAR_PUBLIC_URL;

  return propsAvatarList[index] ?? LCP_AVATAR_PUBLIC_URL;
};

// 백엔드와 통신할 때 매핑 유틸
export const getTokenFromHex = (hex: string) => {
  const entry = Object.values(AVATAR_BG_COLOR).find((c) => c.hex === hex);
  return entry;
};
export const getHexFromToken = (token: string) => {
  const entry = Object.values(AVATAR_BG_COLOR).find((c) => c.token === token);
  return entry;
};
