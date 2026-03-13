import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/shadcn/card';

const NotSettingAccessCode = () => {
  return (
    <div className="flex h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md border border-gray-300 shadow-md">
        <CardHeader>
          <CardTitle>Access Code Not Configured</CardTitle>
          <CardDescription>환경 변수에 접근 코드가 설정되지 않았습니다.</CardDescription>
        </CardHeader>

        <CardContent className="body2-regular text-gray-500">
          <strong>VITE_SENTRY_TEST_CODE</strong> 환경 변수를 설정해야 합니다.
        </CardContent>
        <CardFooter>
          <p className="mt-2">예시:</p>
          <code className="mt-2 block rounded bg-gray-100 px-3 py-2 caption1-regular">
            VITE_SENTRY_TEST_CODE=your-access-code
          </code>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotSettingAccessCode;
