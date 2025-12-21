import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouter } from '@/app/routes/Router';
import ModalRenderer from '@/shared/components/ui/modal/ModalRenderer';
import { Toaster } from 'react-hot-toast';
import AppInitializer from '@/app/AppInitializer';
import RootErrorBoundary from '@/app/RootErrorBoundary/RootErrorBoundary';

const queryClient = new QueryClient();

function App() {
  return (
    <RootErrorBoundary onReset={() => (window.location.href = '/')}>
      <QueryClientProvider client={queryClient}>
        <AppInitializer>
          <ModalRenderer />
          <AppRouter />
          <Toaster position="top-right" reverseOrder={false} />
        </AppInitializer>
      </QueryClientProvider>
    </RootErrorBoundary>
  );
}

export default App;
