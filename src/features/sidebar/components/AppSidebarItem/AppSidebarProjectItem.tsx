import { useLocation } from 'react-router-dom';
import { DropdownMenu, DropdownMenuTrigger } from '@/shared/components/shadcn/dropdown-menu';
import type { SidebarItem } from '@/features/sidebar/types/sidebarTypes';
import AppSidebarBaseItem from '@/features/sidebar/components/AppSidebarItem/AppSidebarBaseItem';
import ProjectListDropdown from '@/features/sidebar/components/ProjectListDropdown/ProjectListDropdown';
import { getIsActive } from '@/features/sidebar/utils/sidebarUtils';

interface AppSidebarProjectItemProps {
  item: SidebarItem;
}

const AppSidebarProjectItem = ({ item }: AppSidebarProjectItemProps) => {
  const location = useLocation();
  const isActive = getIsActive(item, location.pathname);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <AppSidebarBaseItem tooltip={item.title} isActive={isActive}>
            {item.icon}
          </AppSidebarBaseItem>
        </div>
      </DropdownMenuTrigger>

      <ProjectListDropdown title={item.title} />
    </DropdownMenu>
  );
};

export default AppSidebarProjectItem;
