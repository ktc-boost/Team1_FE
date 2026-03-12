import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import type { FallbackProps } from 'react-error-boundary';
import { ROUTE_PATH } from '@/app/routes/Router';
import { Button } from '@/shared/components/shadcn/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/shared/components/shadcn/card';

export default function PageFallback({ error, resetErrorBoundary }: FallbackProps) {
  const navigate = useNavigate();
  const message = error?.message ?? '알 수 없는 오류가 발생했습니다.';
  console.error(error);

  const handleGoBack = () => navigate(-1);
  const handleGoHome = () => navigate(ROUTE_PATH.MAIN);
  const handleRetry = () => resetErrorBoundary();

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-md border-gray-300">
        <CardHeader className="flex flex-col items-center text-center gap-2">
          <AlertCircle className="h-8 w-8 text-boost-orange mb-3" />
          <CardTitle>이 페이지에서 오류가 발생했어요</CardTitle>
          <CardDescription>문제가 발생했습니다. 아래 메시지를 확인해주세요.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 text-center">
          <p className="label1-regular text-gray-500 whitespace-pre-wrap">{message}</p>
          <div className="flex flex-col gap-2">
            <Button variant="defaultBoost" className="w-full" onClick={handleRetry}>
              다시 시도
            </Button>
            <Button variant="secondaryBoost" className="w-full" onClick={handleGoBack}>
              뒤로
            </Button>
            <Button variant="secondary" className="w-full" onClick={handleGoHome}>
              홈으로 이동
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
