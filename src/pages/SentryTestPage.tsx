import * as Sentry from '@sentry/react';
import { useState } from 'react';
import { Button } from '@/shared/components/shadcn/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/shared/components/shadcn/card';
import NotSettingAccessCode from '@/features/sentry/components/NotSettingAccessCode';
import SentryTestAccessGate from '@/features/sentry/components/SentryTestAccessGate';
import toast from 'react-hot-toast';

const ACCESS_CODE = import.meta.env.VITE_SENTRY_TEST_CODE;

const SentryTestPage = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  if (!ACCESS_CODE) return <NotSettingAccessCode />;

  if (!isAuthorized) {
    return (
      <SentryTestAccessGate accessCode={ACCESS_CODE} onAuthorized={() => setIsAuthorized(true)} />
    );
  }

  const throwError = () => {
    toast.success('Throw Error 전송 시도');
    throw new Error('Sentry Test Error - throw');
  };

  const captureException = () => {
    try {
      throw new Error('Sentry Test Error - captureException');
    } catch (error) {
      Sentry.captureException(error);
      toast.success('captureException 전송');
    }
  };

  const promiseError = () => {
    Promise.reject(new Error('Sentry Test Error - Promise rejection'));
    toast.success('Promise Rejection 전송');
  };

  const captureMessage = () => {
    Sentry.captureMessage('Sentry Test Message');
    toast.success('captureMessage 전송');
  };

  const asyncError = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    toast.success('Async Error 전송 시도');
    throw new Error('Sentry Test Error - async');
  };

  const setUserTest = () => {
    Sentry.setUser({
      id: 'test-user-id',
      username: 'testUser',
    });
    Sentry.captureMessage('User attached message');
    toast.success('User 설정 + Message 전송');
  };

  const clearUser = () => {
    Sentry.setUser(null);
    Sentry.captureMessage('User cleared');
    toast.success('User 정보 제거');
  };

  const tagTest = () => {
    Sentry.setTag('test-tag', 'sentry-page');
    Sentry.captureMessage('Tag test message');
    toast.success('Tag 설정 + Message 전송');
  };

  const consoleError = () => {
    console.error('Console error test');
    toast.success('Console Error 발생');
  };

  return (
    <div className="flex h-screen items-center justify-center px-4">
      <Card className="w-full max-w-lg border-gray-300 shadow-md">
        <CardHeader>
          <CardTitle>Sentry Test Page</CardTitle>
          <CardDescription>
            <strong>Sentry 에러 수집 및 이벤트 전송</strong>을 테스트하기 위한 페이지입니다. <br />
            <strong>/sentry-test URL</strong>을 직접 입력 후 접속 코드를 통해 접근 가능합니다.
            <br />
            해당 페이지에서는 로그인 없이 테스트가 진행됩니다.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          <Button onClick={throwError} variant="destructive">
            Throw Error
          </Button>
          <Button onClick={captureException}>captureException</Button>
          <Button onClick={promiseError}>Promise Rejection</Button>
          <Button onClick={asyncError}>Async Error</Button>
          <Button onClick={setUserTest}>Set User + Message</Button>
          <Button onClick={tagTest}>Tag Test</Button>
          <Button onClick={consoleError} variant="secondary">
            Console Error
          </Button>
          <Button onClick={captureMessage} variant="secondary">
            captureMessage
          </Button>
          <Button onClick={clearUser} variant="outline">
            Clear User
          </Button>
        </CardContent>

        <CardFooter className="label2-regular text-gray-400">
          ※ Sentry 설정이 안정화되면 해당 페이지는 삭제될 예정입니다.
        </CardFooter>
      </Card>
    </div>
  );
};

export default SentryTestPage;
