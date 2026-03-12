import { AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/app/routes/Router';
import { Button } from '@/shared/components/shadcn/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/shared/components/shadcn/card';

const ServerErrorPage = () => {
  const navigate = useNavigate();

  const handleRefresh = () => window.location.reload();
  const handleGoHome = () => navigate(ROUTE_PATH.MAIN);

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-md border-gray-300">
        <CardHeader className="flex flex-col items-center text-center gap-2">
          <AlertCircle className="h-8 w-8 text-boost-orange mb-3" />
          <CardTitle>서버 오류가 발생했어요</CardTitle>
          <CardDescription>
            서버에서 문제가 발생했습니다. 잠시 후 다시 시도해주세요.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 text-center">
          <p className="text-6xl font-bold text-boost-orange">500</p>
          <div className="flex flex-col gap-2">
            <Button variant="defaultBoost" className="w-full" onClick={handleRefresh}>
              새로고침
            </Button>
            <Button variant="secondary" className="w-full" onClick={handleGoHome}>
              홈으로 이동
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServerErrorPage;
