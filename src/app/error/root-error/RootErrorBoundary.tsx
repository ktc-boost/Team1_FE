import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import RootFallback from '@/app/error/root-error/RootFallback';

type RootErrorBoundaryProps = {
  children: React.ReactNode;
  onReset?: () => void;
};

function RootErrorBoundary({ children, onReset }: RootErrorBoundaryProps) {
  return (
    <ErrorBoundary
      FallbackComponent={RootFallback}
      onReset={() => {
        onReset?.();
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

export default RootErrorBoundary;
