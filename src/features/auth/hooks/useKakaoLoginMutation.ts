import { useMutation } from '@tanstack/react-query';
import type { KakaoLoginRequest, KakaoLoginResponse } from '@/features/auth/types/authTypes';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { fetchKaKaoLogin } from '@/features/auth/api/authApi';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/app/routes/routePaths';
import toast from 'react-hot-toast';
import type { User } from '@/features/user/types/userTypes';

export const useKakaoLoginMutation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuthStore();
  const savedFrom = localStorage.getItem('login_from');
  const from = location.state?.from || savedFrom;

  return useMutation({
    mutationFn: async (data: KakaoLoginRequest) => {
      const loginData: KakaoLoginResponse = await fetchKaKaoLogin(data);

      const userToStore: User = {
        ...loginData.memberResponseDto,
        avatar: loginData.isNewUser ? undefined : loginData.memberResponseDto.avatar,
        backgroundColor: loginData.isNewUser
          ? undefined
          : loginData.memberResponseDto.backgroundColor,
        notificationEnabled: loginData.isNewUser
          ? undefined
          : loginData.memberResponseDto.notificationEnabled,
      };

      setAuth({ accessToken: loginData.accessToken, user: userToStore });
      return loginData.isNewUser;
    },
    onSuccess: (isNewUser) => {
      toast.success('로그인이 완료되었습니다.');
      window.gtag('event', 'login');
      if (isNewUser) {
        window.gtag('event', 'sign_up');
        navigate(ROUTE_PATH.AVATAR);
      } else if (from) navigate(from, { replace: true });
      else navigate(ROUTE_PATH.MY_TASK);

      localStorage.removeItem('login_from');
    },
    onError: () => toast.error('로그인 중 오류가 발생했습니다 😢'),
  });
};
