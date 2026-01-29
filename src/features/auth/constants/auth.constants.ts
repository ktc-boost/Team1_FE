export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(import.meta.env.VITE_REDIRECT_URI)}`;
export const LOGIN_FROM_KEY = 'login_from';

export const TERMS_URL =
  'https://flat-capricorn-b40.notion.site/BOOST-2a3b32e74312805da68febc9a138d6b7';

export const PRIVACY_URL =
  'https://flat-capricorn-b40.notion.site/BOOST-2a3b32e74312809da69de2046a8f38b3';
