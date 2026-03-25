export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(import.meta.env.VITE_REDIRECT_URI)}`;
export const LOGIN_FROM_KEY = 'login_from';
