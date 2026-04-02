import type { AVATAR_BG_COLOR } from '@/features/avatar-picker/constants/avatar.ui.constants';

export type AvatarColorKey = keyof typeof AVATAR_BG_COLOR;
export type AvatarBgColor = (typeof AVATAR_BG_COLOR)[keyof typeof AVATAR_BG_COLOR];
