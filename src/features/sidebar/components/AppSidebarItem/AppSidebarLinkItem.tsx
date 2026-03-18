import { Link, useLocation } from 'react-router-dom';
import type { SidebarItem } from '@/features/sidebar/types/sidebarTypes';
import AppSidebarBaseItem from '@/features/sidebar/components/AppSidebarItem/AppSidebarBaseItem';
import { getIsActive } from '@/features/sidebar/utils/sidebarUtils';

interface AppSidebarLinkItemProps {
  item: SidebarItem;
}
const AppSidebarLinkItem = ({ item }: AppSidebarLinkItemProps) => {
  const location = useLocation();
  const isActive = getIsActive(item, location.pathname);

  return (
    <AppSidebarBaseItem tooltip={item.title} isActive={isActive}>
      <Link to={item.url || '#'}>{item.icon}</Link>
    </AppSidebarBaseItem>
  );
};

export default AppSidebarLinkItem;
