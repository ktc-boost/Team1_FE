import { Button } from '@/shared/components/shadcn/button';
import type { FallbackProps } from 'react-error-boundary';

export default function RootFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div style={{ padding: 24 }}>
      <h1>앱을 불러오지 못했어요</h1>
      <p style={{ whiteSpace: 'pre-wrap' }}>{error?.message ?? '알 수 없는 오류'}</p>

      <div>
        <Button onClick={resetErrorBoundary}>다시 시도</Button>
      </div>
    </div>
  );
}
