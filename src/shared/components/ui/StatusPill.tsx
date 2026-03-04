import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';

interface StatusPillProps {
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

const StatusPill = ({ icon, children, className }: StatusPillProps) => {
  return (
    <span
      className={cn(
        'inline-flex h-5 items-center gap-1 px-2 rounded-full ring-1 label2-bold',
        className,
      )}
    >
      <span className="shrink-0 flex items-center">{icon}</span>
      <span className="leading-none translate-y-[1px] whitespace-nowrap">{children}</span>
    </span>
  );
};

export default StatusPill;
