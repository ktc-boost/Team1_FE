import { Button } from '@/shared/components/shadcn/button';
import MovingBoo from '@/shared/components/ui/MovingBoo';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-50 overflow-hidden pt-16 pb-24">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-boost-blue rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-boost-orange rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-boost-blue rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 -mt-12">
        <div className="mb-6">
          <h1 className="text-8xl md:text-9xl font-black text-boost-blue mb-2 tracking-tight">
            404
          </h1>
          <div className="h-1 w-32 mx-auto bg-boost-orange rounded-full" />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          페이지를 찾을 수 없어요
        </h2>
        <p className="text-base md:text-lg text-gray-600 mb-10 max-w-md">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다
        </p>

        <div className="mb-10">
          <MovingBoo size={40} />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/">
            <Button variant="defaultBoost" className="!px-8 !py-6 body1-bold sm:w-auto">
              홈으로 돌아가기
            </Button>
          </Link>

          <Button
            variant="secondaryBoost"
            onClick={() => window.history.back()}
            className="!px-8 !py-6 body1-bold sm:w-auto"
          >
            이전 페이지로
          </Button>
        </div>
      </div>

      <div className="absolute bottom-20 text-center label1-regular text-gray-500">
        <p>문제가 계속되면 관리자에게 문의해주세요</p>
      </div>
    </div>
  );
}
