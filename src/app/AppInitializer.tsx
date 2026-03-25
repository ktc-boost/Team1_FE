import * as Sentry from '@sentry/react';
import { useEffect, useRef, type ReactNode } from 'react';
import { ROUTE_PATH } from '@/app/routes/routePaths';
import SplashScreen from '@/pages/SplashScreen';
import { ApiError } from '@/shared/error/types/apiError.types';
import { fetchRefreshToken } from '@/features/auth/api/authApi';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { useMyInfoQuery } from '@/features/settings/hooks/useMyInfoQuery';
import type { User } from '@/features/user/types/userTypes';

interface AppInitializerProps {
  children: ReactNode;
}

const AppInitializer = ({ children }: AppInitializerProps) => {
  const { setAuth, clearAuth, isInitializing, setIsInitializing } = useAuthStore();
  const { refetch: refetchUser } = useMyInfoQuery();

  const hasInit = useRef(false);

  useEffect(() => {
    if (hasInit.current) return;
    hasInit.current = true;

    const pathname = window.location.pathname;

    const publicPaths = [
      ROUTE_PATH.MAIN,
      ROUTE_PATH.LOGIN,
      ROUTE_PATH.ERROR,
      ROUTE_PATH.CALLBACK,
      ROUTE_PATH.ALARM_SETUP_MOBILE,
    ];

    const isPublic = publicPaths.includes(pathname);

    if (isPublic) {
      setIsInitializing(false);
      return;
    }

    const init = async () => {
      try {
        const { accessToken } = await fetchRefreshToken();
        setAuth({ accessToken: accessToken });

        const userResponse = await refetchUser();

        if (userResponse.data) {
          const apiUser = userResponse.data;
          const user: Partial<User> = {
            ...apiUser,
            createdAt: apiUser.createdAt ? new Date(apiUser.createdAt) : undefined,
            updatedAt: apiUser.updatedAt ? new Date(apiUser.updatedAt) : undefined,
          };
          setAuth({ user });
        }
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
          console.error('리프레시 토큰 만료 또는 사용자 정보 조회 실패:', error);
          clearAuth();
        } else {
          Sentry.captureException(error, {
            tags: { section: 'app-initializer' },
            extra: {
              pathname: window.location.pathname,
            },
          });
        }
      } finally {
        setIsInitializing(false);
      }
    };

    init();
  }, [setAuth, clearAuth, setIsInitializing, refetchUser]);

  if (isInitializing) return <SplashScreen />;

  return <>{children}</>;
};

export default AppInitializer;
