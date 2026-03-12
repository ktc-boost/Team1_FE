import type { ReactNode } from 'react';
import { SidebarMenuButton, SidebarMenuItem } from '@/shared/components/shadcn/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/components/shadcn/tooltip';

interface AppSidebarBaseItemProps {
  tooltip: string;
  children: ReactNode;
}

const AppSidebarBaseItem = ({ tooltip, children }: AppSidebarBaseItemProps) => {
  return (
    <SidebarMenuItem className="pb-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarMenuButton className="cursor-pointer focus:ring-transparent">
            {children}
          </SidebarMenuButton>
        </TooltipTrigger>

        <TooltipContent side="right" className="text-center">
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </SidebarMenuItem>
  );
};

export default AppSidebarBaseItem;
