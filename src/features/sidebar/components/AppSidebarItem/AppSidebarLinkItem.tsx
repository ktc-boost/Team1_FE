import { useLocation, useNavigate } from 'react-router-dom';
import type { SidebarItem } from '@/features/sidebar/types/sidebarTypes';
import AppSidebarBaseItem from '@/features/sidebar/components/AppSidebarItem/AppSidebarBaseItem';
import { getIsActive } from '@/features/sidebar/utils/sidebarUtils';

interface AppSidebarLinkItemProps {
  item: SidebarItem;
}

const AppSidebarLinkItem = ({ item }: AppSidebarLinkItemProps) => {
  const location = useLocation();
  const isActive = getIsActive(item, location.pathname);
  const navigate = useNavigate();

  return (
    <AppSidebarBaseItem
      tooltip={item.title}
      isActive={isActive}
      onClick={() => item.url && navigate(item.url)}
    >
      {item.icon}
    </AppSidebarBaseItem>
  );
};

export default AppSidebarLinkItem;
