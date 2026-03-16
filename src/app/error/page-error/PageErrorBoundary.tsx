import type { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation } from 'react-router-dom';
import PageFallback from '@/app/error/page-error/PageFallback';

type PageErrorBoundaryProps = PropsWithChildren<{
  onReset?: () => void;
}>;

export default function PageErrorBoundary({ children, onReset }: PageErrorBoundaryProps) {
  const location = useLocation();

  return (
    <ErrorBoundary
      FallbackComponent={PageFallback}
      resetKeys={[location.key]}
      onReset={() => {
        onReset?.();
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
