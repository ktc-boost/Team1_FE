import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import * as Sentry from '@sentry/react';
import RootFallback from '@/app/error/root-error/RootFallback';

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
