import { useKakaoLoginMutation } from '@/features/auth/hooks/useKakaoLoginMutation';
import { useEffect, useRef } from 'react';

const KakaoCallbackPage = () => {
  const { mutate: kakaoLoginMutation } = useKakaoLoginMutation();
  const hasLoggedIn = useRef(false);

  useEffect(() => {
    if (hasLoggedIn.current) return;

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    const redirectUri = import.meta.env.VITE_REDIRECT_URI;

    if (code) {
      kakaoLoginMutation({ code, redirectUri });
      hasLoggedIn.current = true;
    }
  }, [kakaoLoginMutation]);

  return null; // 백그라운드 로그인 처리용 페이지이므로 null 처리
};

export default KakaoCallbackPage;
