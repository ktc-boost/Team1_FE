import { Headset, LogOut } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
} from '@/shared/components/shadcn/sidebar';
import { Separator } from '@/shared/components/shadcn/separator';
import { Avatar } from '@/shared/components/shadcn/avatar';
import UserAvatar from '@/shared/components/ui/UserAvatar';
import { sidebarItems } from '@/features/sidebar/data/sidebarData';
import AppSidebarLinkItem from '@/features/sidebar/components/AppSidebarItem/AppSidebarLinkItem';
import AppSidebarProjectItem from '@/features/sidebar/components/AppSidebarItem/AppSidebarProjectItem';
import AppSidebarNotificationItem from '@/features/sidebar/components/AppSidebarItem/AppSidebarNotificationItem';
import { useLogoutMutation } from '@/features/auth/hooks/useLogoutMutation';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { useInquireModals } from '@/features/inquire/hooks/useInquireModals';

const AppSidebar = () => {
  const user = useAuthStore((state) => state.user);
  const { mutate: LogoutMutation } = useLogoutMutation();
  const { showInquireModal } = useInquireModals();

  const handleLogoutClick = () => LogoutMutation();
  const handleInquireClick = () => showInquireModal();

  return (
    <Sidebar variant="sidebar" className="border-0 border-gray-300" collapsible="icon">
      <SidebarHeader className="flex-row text-center pt-4 pb-4 pl-3 pr-3 h-18 bg-white">
        <Avatar
          style={{ backgroundColor: user?.backgroundColor }}
          className="justify-center items-center w-11 h-11 shadow-sm"
        >
          <UserAvatar user={user} />
        </Avatar>
      </SidebarHeader>

      <SidebarContent className="pl-3 pr-3 bg-white">
        <Separator />
        <SidebarGroup />
        <SidebarMenu className="flex-col items-center">
          {sidebarItems.map((item) => {
            if (item.type === 'project')
              return <AppSidebarProjectItem key={item.title} item={item} />;
            if (item.type === 'notification')
              return <AppSidebarNotificationItem key={item.title} item={item} />;
            return <AppSidebarLinkItem key={item.title} item={item} />;
          })}
        </SidebarMenu>
        <SidebarGroup />
      </SidebarContent>

      <Separator className="pl-3 pr-3" />

      {user && (
        <SidebarFooter className="w-full items-center justify-center bg-white gap-0">
          <div onClick={handleInquireClick} className="cursor-pointer p-1 my-2">
            <Headset size={21} className="text-gray-600 hover:text-gray-700" />
          </div>

          <div onClick={handleLogoutClick} className="cursor-pointer p-1 my-2">
            <LogOut size={21} className="text-red-600 hover:text-red-500" />
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
};

export default AppSidebar;
