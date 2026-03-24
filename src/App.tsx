import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouter } from '@/app/routes/Router';
import AppInitializer from '@/app/AppInitializer';
import RootErrorBoundary from '@/app/error/root-error/RootErrorBoundary';
import { TooltipProvider } from '@/shared/components/shadcn/tooltip';

const queryClient = new QueryClient();

function App() {
  return (
    <RootErrorBoundary onReset={() => (window.location.href = '/')}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AppInitializer>
            <AppRouter />
            <Toaster position="top-right" reverseOrder={false} />
          </AppInitializer>
        </TooltipProvider>
      </QueryClientProvider>
    </RootErrorBoundary>
  );
}

export default App;
