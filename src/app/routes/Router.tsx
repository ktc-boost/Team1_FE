import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ROUTE_PATH } from '@/app/routes/routePaths';
import ProtectedRoute from '@/app/routes/ProtectedRoute';
import RootFallback from '@/app/error/root-error/RootFallback';
import PageErrorBoundary from '@/app/error/page-error/PageErrorBoundary';
import AppLayout from '@/app/layout/AppLayout';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import MyTaskPage from '@/pages/MyTaskPage';
import ProjectPage from '@/pages/ProjectPage';
import SettingsPage from '@/pages/SettingsPage';
import ServerErrorPage from '@/pages/ServerErrorPage';
import AvatarPickerPage from '@/pages/AvatarSettingsPage';
import KakaoCallbackPage from '@/pages/KakaoCallbackPage';
import AlarmSetupPage from '@/pages/AlarmSetupPage';
import AlarmSetupMobilePage from '@/pages/AlarmSetupMobilePage';
import ModalRenderer from '@/shared/components/ui/modal/ModalRenderer';
import BoardSection from '@/features/board/components/BoardSection';
import MemoSection from '@/features/memo/components/MemoSection';
import FileSection from '@/features/file/components/FileSection';
import SentryTestPage from '@/pages/SentryTestPage';
import BoardTestPage from '@/features/board/test/BoardPage.test';
import ModalTestPage from '@/pages/ModalTestPage';

const TaskDetailPage = lazy(() => import('@/pages/TaskDetailPage'));
const MemoDetail = lazy(() => import('@/features/memo/components/MemoDetail/MemoDetail'));
const MemoEditor = lazy(() => import('@/features/memo/components/MemoEditor/MemoEditor'));

const PUBLIC_ROUTES = [
  { path: ROUTE_PATH.MAIN, element: <LandingPage /> },
  { path: ROUTE_PATH.LOGIN, element: <LoginPage /> },
  { path: ROUTE_PATH.ERROR, element: <ServerErrorPage /> },
  { path: ROUTE_PATH.CALLBACK, element: <KakaoCallbackPage /> },
  { path: ROUTE_PATH.ALARM_SETUP_MOBILE, element: <AlarmSetupMobilePage /> },
  { path: ROUTE_PATH.SENTRY_TEST, element: <SentryTestPage /> },
  { path: ROUTE_PATH.BOARD_TEST, element: <BoardTestPage /> },
  { path: ROUTE_PATH.MODAL_TEST, element: <ModalTestPage /> },
];

const PROTECTED_ROUTES = [
  {
    path: ROUTE_PATH.PROJECT,
    element: <ProjectPage />,
    children: [
      { path: 'board', element: <BoardSection type="project" /> },
      { path: 'file', element: <FileSection /> },
      { path: 'memo', element: <MemoSection /> },
      { path: 'memo/edit/:memoId?', element: <MemoEditor /> },
      { path: 'memo/:memoId', element: <MemoDetail /> },
    ],
  },
  { path: ROUTE_PATH.MY_TASK, element: <MyTaskPage /> },
  { path: ROUTE_PATH.TASK_DETAIL, element: <TaskDetailPage /> },
  { path: ROUTE_PATH.SETTINGS, element: <SettingsPage /> },
];

const PROTECTED_ROUTES_NO_LAYOUT = [
  { path: ROUTE_PATH.AVATAR, element: <AvatarPickerPage /> },
  { path: ROUTE_PATH.ALARM_SETUP, element: <AlarmSetupPage /> },
];

const withProtected = (element: React.ReactNode) => (
  <ProtectedRoute>
    <PageErrorBoundary>{element}</PageErrorBoundary>
  </ProtectedRoute>
);

export const router = createBrowserRouter([
  ...PUBLIC_ROUTES,

  ...PROTECTED_ROUTES_NO_LAYOUT.map((route) => ({
    ...route,
    element: withProtected(route.element),
  })),

  {
    path: '/',
    element: <AppLayout />,
    errorElement: <RootFallback />,
    children: PROTECTED_ROUTES.map((route) => ({
      ...route,
      element: withProtected(route.element),
    })),
  },
]);

export const AppRouter = () => {
  return (
    <>
      <ModalRenderer />
      <RouterProvider router={router} />
    </>
  );
};
