import { useLocation } from 'react-router-dom';
import GoMainButton from '@/features/auth/components/GoMainButton';
import InfoSection from '@/features/auth/components/InfoSection';
import LoginSection from '@/features/auth/components/LoginSection';
import { KAKAO_AUTH_URL, LOGIN_FROM_KEY } from '@/features/auth/constants/auth.constants';

const LoginPage = () => {
  const location = useLocation();

  const handleKakaoLogin = () => {
    const from = location.state?.from || '/my-task';
    localStorage.setItem(LOGIN_FROM_KEY, from);
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen items-center justify-center p-4 bg-gradient-to-br from-boost-blue/10 via-boost-blue/5 to-white">
      <GoMainButton />
      <div className="flex flex-col md:flex-row overflow-hidden w-full max-w-5xl h-auto md:h-[580px] bg-white rounded-3xl shadow-[0_3px_20px_rgb(0,0,0,0.1)]">
        <InfoSection />
        <LoginSection onKakaoLogin={handleKakaoLogin} />
      </div>
    </div>
  );
};

export default LoginPage;
