import RootFallback from '@/app/RootErrorBoundary/RootFallback';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

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
