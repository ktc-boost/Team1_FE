import { Link } from 'react-router-dom';
import type { SidebarItem } from '@/features/sidebar/types/sidebarTypes';
import AppSidebarBaseItem from '@/features/sidebar/components/AppSidebarItem/AppSidebarBaseItem';

interface AppSidebarLinkItemProps {
  item: SidebarItem;
}
const AppSidebarLinkItem = ({ item }: AppSidebarLinkItemProps) => {
  return (
    <AppSidebarBaseItem tooltip={item.title}>
      <Link to={item.url || '#'}>{item.icon}</Link>
    </AppSidebarBaseItem>
  );
};

export default AppSidebarLinkItem;
