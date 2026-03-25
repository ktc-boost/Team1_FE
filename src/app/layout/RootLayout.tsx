import { Outlet } from 'react-router-dom';
import ModalRenderer from '@/shared/components/ui/modal/ModalRenderer';

const RootLayout = () => {
  return (
    <>
      <Outlet />
      <ModalRenderer />
    </>
  );
};

export default RootLayout;
