export interface SidebarSubItem {
  title: string;
  url: string;
}

export interface SidebarItem {
  title: string;
  url?: string;
  icon: React.ReactNode;
  subItems?: SidebarSubItem[];
  type: 'project' | 'notification' | 'link';
}
