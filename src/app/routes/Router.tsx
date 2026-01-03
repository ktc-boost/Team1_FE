import { createBrowserRouter, generatePath, RouterProvider } from 'react-router-dom';
import ProtectedRoute from '@/app/routes/ProtectedRoute';
import AppLayout from '@/app/layout/AppLayout';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import MyTaskPage from '@/pages/MyTaskPage';
import ProjectPage from '@/pages/ProjectPage';
import ServerErrorPage from '@/pages/ServerErrorPage';
import TaskDetailPage from '@/pages/TaskDetailPage';
import AvatarPickerPage from '@/pages/AvatarPickerPage';
import KakaoCallbackPage from '@/pages/KakaoCallbackPage';
import AlarmSetupPage from '@/pages/AlarmSetupPage';
import AlarmSetupMobilePage from '@/pages/AlarmSetupMobilePage';
import BoardSection from '@/features/board/components/BoardSection';
import MemoSection from '@/features/memo/components/MemoSection';
import FileSection from '@/features/file/components/FileSection';
import MemoEditor from '@/features/memo/components/MemoEditor/MemoEditor';
import MemoDetail from '@/features/memo/components/MemoDetail/MemoDetail';
import SettingsPage from '@/pages/SettingsPage';
import PageErrorBoundary from '@/pages/PageErrorBoundary/PagaErrorBoundary';
import RootFallback from '@/app/RootErrorBoundary/RootFallback';

export const ROUTE_PATH = {
  MAIN: '/',
  LOGIN: '/login',
  PROJECT: '/project/:projectId',
  PROJECT_BOARD: '/project/:projectId/board',
  PROJECT_MEMO: '/project/:projectId/memo',
  MEMO_EDIT: '/project/:projectId/memo/edit/:memoId?',
  MEMO_DETAIL: '/project/:projectId/memo/:memoId',
  PROJECT_FILE: '/project/:projectId/file',
  MY_TASK: '/my-task',
  ERROR: '/error',
  AVATAR: '/avatar',
  CALLBACK: '/auth/callback',
  TASK_DETAIL: '/project/:projectId/tasks/:taskId',
  ALARM_SETUP: '/alarm/setup',
  ALARM_SETUP_MOBILE: '/alarm/permission',
  SETTINGS: '/my-settings',
};

export const ROUTES = {
  PROJECT_MEMO_LIST: (projectId: string) => generatePath(ROUTE_PATH.PROJECT_MEMO, { projectId }),
  PROJECT_MEMO_DETAIL: (projectId: string, memoId: string) =>
    generatePath(ROUTE_PATH.MEMO_DETAIL, { projectId, memoId }),
  PROJECT_MEMO_EDIT: (projectId: string, memoId?: string) =>
    memoId
      ? generatePath(ROUTE_PATH.MEMO_EDIT, { projectId, memoId })
      : `/project/${projectId}/memo/edit`,
  PROJECT_BOARD: (projectId: string) => generatePath(ROUTE_PATH.PROJECT_BOARD, { projectId }),
  PROJECT_FILE: (projectId: string) => generatePath(ROUTE_PATH.PROJECT_FILE, { projectId }),
  TASK_DETAIL: (projectId: string, taskId: string) =>
    generatePath(ROUTE_PATH.TASK_DETAIL, { projectId, taskId }),
};

const PUBLIC_ROUTES = [
  { path: ROUTE_PATH.MAIN, element: <LandingPage /> },
  { path: ROUTE_PATH.LOGIN, element: <LoginPage /> },
  { path: ROUTE_PATH.ERROR, element: <ServerErrorPage /> },
  { path: ROUTE_PATH.CALLBACK, element: <KakaoCallbackPage /> },
  { path: ROUTE_PATH.ALARM_SETUP_MOBILE, element: <AlarmSetupMobilePage /> },
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

export const router = createBrowserRouter([
  ...PUBLIC_ROUTES,

  ...PROTECTED_ROUTES_NO_LAYOUT.map((route) => ({
    ...route,
    element: (
      <ProtectedRoute>
        <PageErrorBoundary>{route.element}</PageErrorBoundary>
      </ProtectedRoute>
    ),
  })),

  {
    path: '/',

    element: <AppLayout />,
    errorElement: (
      <RootFallback
        error={new Error('라우터 레벨 디자인 테스트')}
        resetErrorBoundary={() => window.location.reload()}
      />
    ),
    children: [
      ...PROTECTED_ROUTES.map((route) => ({
        ...route,
        element: (
          <ProtectedRoute>
            <PageErrorBoundary>{route.element}</PageErrorBoundary>
          </ProtectedRoute>
        ),
      })),
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
