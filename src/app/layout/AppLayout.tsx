import { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import AppSidebar from '@/widgets/AppSidebar';
import { SidebarProvider } from '@/shared/components/shadcn/sidebar';
import FloatingSidebarTrigger from '@/features/sidebar/components/FloatingSidebarTrigger';

const AppLayout = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <SidebarProvider defaultOpen={false}>
      <div
        ref={containerRef}
        className="flex w-screen h-screen relative overflow-hidden touch-none"
      >
        <AppSidebar />

        <main className="flex-1 flex flex-col min-w-0">
          <Outlet />
        </main>

        <FloatingSidebarTrigger containerRef={containerRef} />
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
