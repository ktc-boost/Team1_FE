import type { STATUS_THEME } from '@/features/board/constants/board.ui.constants';

export type StatusTheme = typeof STATUS_THEME;
export type StatusThemeItem = StatusTheme[keyof StatusTheme];
