import { Button } from '@/shared/components/shadcn/button';
import { Separator } from '@/shared/components/shadcn/separator';
import { EXTERNAL_LINKS } from '@/shared/constants/external-links';
import { Github } from 'lucide-react';

const LandingFooter = () => {
  const handleKakaoInquireClick = () => window.open(EXTERNAL_LINKS.KAKAO_CHAT, '_blank');
  const handleNaverformInquireClick = () => window.open(EXTERNAL_LINKS.NAVER_FORM, '_blank');
  const handleGithubClick = () => window.open(EXTERNAL_LINKS.GITHUB, '_blank');

  return (
    <footer className="mt-24 w-full bg-gradient-to-b from-gray-900 to-black text-white pt-24 pb-12">
      <div className="mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-6">궁금한 점이 있으신가요?</h2>

          <p className="text-gray-300 mb-12 text-sm sm:text-lg leading-relaxed">
            BOOST에 대해 더 자세히 알고 싶거나 도움이 필요하시다면 <br />
            아래 버튼을 눌러 문의 및 피드백을 남겨주세요.
          </p>

          <div className="flex flex-col gap-7 items-center">
            <div className="flex gap-2">
              <Button
                onClick={handleKakaoInquireClick}
                className="w-40 sm:w-60 h-13 subtitle1-regular rounded-full"
              >
                카카오톡 문의
              </Button>

              <Button
                onClick={handleNaverformInquireClick}
                className="w-40 sm:w-60 h-13 subtitle1-regular rounded-full"
              >
                네이버폼 문의
              </Button>
            </div>

            <Button
              variant="ghost"
              onClick={handleGithubClick}
              className="gap-2 text-gray-400 hover:bg-transparent hover:text-white"
            >
              <Github className="w-5 h-5" />
              <span className="body2-regular">GitHub에서 프로젝트 보기</span>
            </Button>
          </div>

          <Separator className="mt-16 bg-gray-900/70" />

          <p className="mt-6 text-xs text-gray-500 hover:text-gray-400 transition-colors">
            © {new Date().getFullYear()} BOOST. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
