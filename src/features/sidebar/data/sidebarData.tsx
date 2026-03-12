import { ROUTE_PATH } from '@/app/routes/routePaths';
import type { SidebarItem } from '@/features/sidebar/types/sidebarTypes';
import { Settings, User, Layers, Bell } from 'lucide-react';

export const sidebarItems: SidebarItem[] = [
  { title: '나의 할 일', url: ROUTE_PATH.MY_TASK, icon: <User size={16} />, type: 'link' },
  { title: '프로젝트', icon: <Layers size={16} />, type: 'project' },
  { title: '알림', icon: <Bell size={16} />, type: 'notification' },
  { title: '설정', url: ROUTE_PATH.SETTINGS, icon: <Settings size={16} />, type: 'link' },
];
