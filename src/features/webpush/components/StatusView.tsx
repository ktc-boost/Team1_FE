import { cn } from '@/shared/lib/utils';

interface StatusViewProps {
  title: string;
  message: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
  blurClass: string;
  bgClass: string;
  textClass: string;
  children?: React.ReactNode;
}

const StatusView = ({
  title,
  message,
  icon: Icon,
  blurClass,
  bgClass,
  textClass,
  children,
}: StatusViewProps) => (
  <div className="flex min-h-[100dvh] flex-col items-center justify-center p-6 text-center space-y-6">
    <div className="relative flex h-18 w-18 items-center justify-center">
      <div className={cn('absolute inset-0 rounded-full blur-md', blurClass)} />
      <div
        className={cn(
          'relative z-10 flex h-18 w-18 items-center justify-center rounded-full',
          bgClass,
        )}
      >
        <Icon className={cn('h-10 w-10', textClass)} />
      </div>
    </div>

    <div className="space-y-2">
      <h2 className="title1-bold text-gray-900">{title}</h2>
      <p className="subtitle2-regular text-gray-600 leading-relaxed">{message}</p>
    </div>

    {children}
  </div>
);
export default StatusView;
