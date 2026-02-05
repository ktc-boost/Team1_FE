import { useNavigate, useParams } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/shared/components/shadcn/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/components/shadcn/tooltip';
import { SidebarMenuButton, SidebarMenuItem } from '@/shared/components/shadcn/sidebar';
import ProjectCreateButton from '@/features/sidebar/components/AppSidebarProjectButton';
import { useProjectsQuery } from '@/features/project/hooks/query/useProjectsQuery';
import type { SidebarItem } from '@/features/sidebar/types/menuTypes';
import { ROUTES } from '@/app/routes/Router';

const AppSidebarProjectMenuItem = ({ item }: { item: SidebarItem }) => {
  const { data: projects } = useProjectsQuery();
  const navigate = useNavigate();
  const { projectId: currentProjectId } = useParams<{ projectId: string }>();

  return (
    <SidebarMenuItem className="pb-4">
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild onFocus={(e) => e.preventDefault()}>
            <SidebarMenuButton
              asChild
              className="cursor-pointer focus:ring-transparent focus:bg-gray-300"
            >
              <DropdownMenuTrigger>{item.icon}</DropdownMenuTrigger>
            </SidebarMenuButton>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-center">
            <p>{item.title}</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent
          side="right"
          align="center"
          sideOffset={30}
          className="w-56 pt-2 pb-2 border border-gray-300 bg-white shadow-lg rounded-md"
        >
          <DropdownMenuLabel className="text-xs font-medium">{item.title}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={currentProjectId}
            onValueChange={(value) => {
              navigate(ROUTES.PROJECT_BOARD(value));
            }}
          >
            {projects && projects.length > 0 ? (
              projects.map((project) => (
                <DropdownMenuRadioItem key={project.id} value={project.id}>
                  {project.name}
                </DropdownMenuRadioItem>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-2">프로젝트가 없습니다</p>
            )}
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <ProjectCreateButton />
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
};

export default AppSidebarProjectMenuItem;
