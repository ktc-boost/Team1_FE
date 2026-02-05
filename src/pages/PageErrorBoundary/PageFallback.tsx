import { Button } from '@/shared/components/shadcn/button';
import type { FallbackProps } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

export default function PageFallback({ error, resetErrorBoundary }: FallbackProps) {
  const navigate = useNavigate();

  return (
    <div role="alert">
      <h2>이 페이지에서 오류가 발생했어요.</h2>
      <p style={{ whiteSpace: 'pre-wrap' }}>{error?.message ?? '알 수 없는 오류'}</p>
      <div>
        <Button onClick={() => resetErrorBoundary()}>다시 시도</Button>
        <Button onClick={() => navigate(-1)}>뒤로</Button>
        <Button onClick={() => navigate('/')}>홈</Button>
      </div>
    </div>
  );
}
