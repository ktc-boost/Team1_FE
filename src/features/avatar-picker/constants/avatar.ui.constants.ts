// 아바타 배경 색
export const AVATAR_BG_COLOR = {
  BLUE: {
    token: 'var(--color-avatar-blue)',
    hex: '#D5E3FF',
  },
  ORANGE: {
    token: 'var(--color-avatar-orange)',
    hex: '#FBE0CB',
  },
  YELLOW: {
    token: 'var(--color-avatar-yellow)',
    hex: '#FFF5CF',
  },
  RED: {
    token: 'var(--color-avatar-red)',
    hex: '#FFD1D1',
  },
  PINK: {
    token: 'var(--color-avatar-pink)',
    hex: '#FFE3FD',
  },
  GREEN: {
    token: 'var(--color-avatar-green)',
    hex: '#DFF5E6',
  },
  PURPLE: {
    token: 'var(--color-avatar-purple)',
    hex: '#E9DCFF',
  },
  GRAY: {
    token: 'var(--color-avatar-gray)',
    hex: '#DBDBDB',
  },
} as const;

// 아바타 기본값
export const DEFAULT_AVATAR_ID = '0';
export const DEFAULT_BG_COLOR = AVATAR_BG_COLOR.BLUE.hex;

// 배경색 기본값
export const DEFAULT_BG = '#ffffff';
export const SELECTED_BG = '#f6f8fa';

// 아바타 배경색 목록
export const avatarBgColors = Object.values(AVATAR_BG_COLOR);
