import RootFallback from '@/app/RootErrorBoundary/RootFallback';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import * as Sentry from '@sentry/react';

type RootErrorBoundaryProps = {
  children: React.ReactNode;
  onReset?: () => void;
};

function RootErrorBoundary({ children, onReset }: RootErrorBoundaryProps) {
  return (
    <ErrorBoundary
      FallbackComponent={RootFallback}
      onReset={onReset}
      onError={(error, info) => {
        Sentry.captureException(error, {
          tags: { type: 'rendering_error' },
          extra: {
            componentStack: info.componentStack,
          },
        });
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

export default RootErrorBoundary;
