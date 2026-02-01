import { cn } from '@/shared/lib/utils';
import { Loader2 } from 'lucide-react';

interface SmallLoaderProps {
  text?: string;
  className?: string;
  loaderClassName?: string;
}

const SmallLoader = ({ text, className = '', loaderClassName = '' }: SmallLoaderProps) => {
  if (!text) return <Loader2 className={cn('h-4 w-4 animate-spin', loaderClassName)} />;

  return (
    <span className={cn('flex items-center', className)}>
      <Loader2 className={cn('h-4 w-4 animate-spin mr-2', loaderClassName)} />
      {text}
    </span>
  );
};

export default SmallLoader;
