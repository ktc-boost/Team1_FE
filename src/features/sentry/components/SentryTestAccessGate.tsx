import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/shared/components/shadcn/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/shared/components/shadcn/card';
import { Input } from '@/shared/components/shadcn/input';

interface SentryTestAccessGateProps {
  accessCode: string;
  onAuthorized: () => void;
}

const SentryTestAccessGate = ({ accessCode, onAuthorized }: SentryTestAccessGateProps) => {
  const [code, setCode] = useState('');

  const handleAccess = () => {
    if (code === accessCode) {
      toast.success('Sentry Test Page에 접속했습니다.');
      onAuthorized();
    } else {
      toast.error('접근 코드가 올바르지 않습니다.');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md border border-gray-300 shadow-md">
        <CardHeader>
          <CardTitle>Restricted Page</CardTitle>
          <CardDescription>
            이 페이지는 허용된 사용자만 접근할 수 있습니다.
            <br />
            접근 코드를 입력하세요.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          <Input
            className="focus:ring-transparent"
            placeholder="Access Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAccess();
            }}
          />
          <Button onClick={handleAccess}>Enter</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SentryTestAccessGate;
