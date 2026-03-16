import type { ReactNode } from 'react';
import { SidebarMenuButton, SidebarMenuItem } from '@/shared/components/shadcn/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/components/shadcn/tooltip';
import { useIsMobile } from '@/shared/hooks/use-mobile';

interface AppSidebarBaseItemProps {
  tooltip: string;
  children: ReactNode;
  isActive?: boolean;
}

const AppSidebarBaseItem = ({ tooltip, children, isActive }: AppSidebarBaseItemProps) => {
  const isMobile = useIsMobile();

  const SidebarItemButton = (
    <SidebarMenuButton
      isActive={isActive}
      className="cursor-pointer focus:ring-transparent data-[active=true]:bg-gray-300"
    >
      {children}
    </SidebarMenuButton>
  );

  if (isMobile) return <SidebarMenuItem className="pb-4">{SidebarItemButton}</SidebarMenuItem>;

  return (
    <SidebarMenuItem className="pb-4">
      <Tooltip>
        <TooltipTrigger asChild>{SidebarItemButton}</TooltipTrigger>
        <TooltipContent side="right" className="text-center">
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </SidebarMenuItem>
  );
};

export default AppSidebarBaseItem;
