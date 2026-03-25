import KakaoLoginButton from '@/features/auth/components/KakaoLoginButton';
import BubbleDecoration from '@/features/auth/components/BubbleDecoration';
import { EXTERNAL_LINKS } from '@/shared/constants/external-links';

interface LoginSectionProps {
  onKakaoLogin: () => void;
}

const LoginSection = ({ onKakaoLogin }: LoginSectionProps) => {
  return (
    <section className="flex-1 p-10 md:p-20 flex flex-col justify-center bg-white">
      <div className="mb-8 md:mb-12 text-center md:text-left">
        <h2 className="text-xl sm:text-4xl font-extrabold mb-2 md:mb-3 text-boost-blue-dark">
          환영합니다!
        </h2>
        <p className="text-gray-600 body2-regular sm:body1-regular leading-relaxed">
          Boost와 함께 새로운 경험을 시작해보세요.
          <br />
          카카오 계정으로 간편하게 시작할 수 있어요.
        </p>
      </div>

      <div className="relative flex flex-col items-center mt-8 md:mt-10">
        <BubbleDecoration />
        <KakaoLoginButton onClick={onKakaoLogin} />
      </div>

      <div className="flex items-center my-6 md:my-8">
        <div className="flex-1 h-px bg-gray-300" />
        <span className="px-4 label2-regular sm:label1-regular text-gray-400">간편 로그인</span>
        <div className="flex-1 h-px bg-gray-300" />
      </div>

      <div className="bg-gray-200 p-4 md:p-5 rounded-xl">
        <p className="label2-regular sm:body1-regular text-gray-600 leading-relaxed text-center">
          로그인 시{' '}
          <a href={EXTERNAL_LINKS.TERMS} className="text-boost-blue font-bold hover:underline">
            이용약관
          </a>{' '}
          및{' '}
          <a href={EXTERNAL_LINKS.PRIVACY} className="text-boost-blue font-bold hover:underline">
            개인정보처리방침
          </a>
          에 동의하게 됩니다.
        </p>
      </div>
    </section>
  );
};

export default LoginSection;
