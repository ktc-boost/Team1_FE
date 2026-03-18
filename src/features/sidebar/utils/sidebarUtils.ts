import { matchPath } from 'react-router-dom';
import { ROUTE_PATH } from '@/app/routes/routePaths';
import type { SidebarItem } from '@/features/sidebar/types/sidebarTypes';

export const getIsActive = (item: SidebarItem, pathname: string): boolean => {
  if (item.type === 'link' && item.url) {
    return pathname.startsWith(item.url);
  }

  if (item.type === 'project') {
    return !!matchPath({ path: ROUTE_PATH.PROJECT, end: false }, pathname);
  }

  if (item.type === 'notification') {
    return !!matchPath({ path: ROUTE_PATH.ALARM_SETUP, end: false }, pathname);
  }

  return false;
};
