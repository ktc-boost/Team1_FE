import { Button } from '@/shared/components/shadcn/button';
import { Separator } from '@/shared/components/shadcn/separator';
import { Github } from 'lucide-react';

const LandingFooter = () => {
  return (
    <footer className="mt-24 w-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24 pb-12">
      <div className="mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-6">궁금한 점이 있으신가요?</h2>

          <p className="text-gray-300 mb-12 text-lg leading-relaxed">
            BOOST에 대해 더 자세히 알고 싶거나 도움이 필요하시다면 <br />
            아래 버튼을 눌러 네이버폼으로 이동해주세요.
          </p>

          <div className="flex flex-col gap-7 items-center">
            <Button asChild className="w-60 h-13 subtitle1-regular transition-all">
              <a href="https://naver.me/G9pDvPJh" target="_blank" rel="noopener noreferrer">
                네이버폼 바로가기
              </a>
            </Button>

            <a
              href="https://github.com/ktc-boost"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="body2-regular">GitHub에서 프로젝트 보기</span>
            </a>
          </div>

          <Separator className="mt-16 bg-gray-900/70" />

          <p className="mt-6 text-xs text-gray-500 hover:text-gray-400 transition-colors">
            © 2025 BOOST. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
