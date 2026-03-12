import { useAuthStore } from '@/features/auth/store/useAuthStore';
import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ROUTE_PATH } from '@/app/routes/routePaths';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { accessToken, isInitializing } = useAuthStore();
  const location = useLocation();
  if (isInitializing) {
    return <div>로딩 중 ...</div>;
  }
  if (!accessToken) {
    // 초기화 끝났고, 토큰도 없으면 로그인 페이지로
    return <Navigate to={ROUTE_PATH.LOGIN} state={{ from: location.pathname }} replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
