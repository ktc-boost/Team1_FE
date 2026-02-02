import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Label } from '@/shared/components/shadcn/label';

interface ContentItemProps {
  icon: LucideIcon;
  title: string;
  children?: ReactNode;
  action?: ReactNode;
}

const ContentItem = ({ icon: Icon, title, children, action }: ContentItemProps) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center justify-between">
      <Label className="label2-bold flex items-center gap-2 text-gray-800 sm:subtitle1-bold">
        <Icon className="w-4 h-4 text-gray-700" />
        {title}
      </Label>
      {action && <div>{action}</div>}
    </div>
    {children && <div>{children}</div>}
  </div>
);

export default ContentItem;
