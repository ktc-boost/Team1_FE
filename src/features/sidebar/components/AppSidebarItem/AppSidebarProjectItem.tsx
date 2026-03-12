import { DropdownMenu, DropdownMenuTrigger } from '@/shared/components/shadcn/dropdown-menu';
import type { SidebarItem } from '@/features/sidebar/types/sidebarTypes';
import AppSidebarBaseItem from '@/features/sidebar/components/AppSidebarItem/AppSidebarBaseItem';
import ProjectListDropdown from '@/features/sidebar/components/ProjectListDropdown/ProjectListDropdown';

interface AppSidebarProjectItemProps {
  item: SidebarItem;
}

const AppSidebarProjectItem = ({ item }: AppSidebarProjectItemProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <AppSidebarBaseItem tooltip={item.title}>{item.icon}</AppSidebarBaseItem>
        </div>
      </DropdownMenuTrigger>

      <ProjectListDropdown title={item.title} />
    </DropdownMenu>
  );
};

export default AppSidebarProjectItem;
