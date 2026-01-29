interface KakaoLoginButtonProps {
  onClick: () => void;
}

const KakaoLoginButton = ({ onClick }: KakaoLoginButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-[#FEE500] hover:bg-[#FDD835] text-black/85 font-bold py-3 sm:py-4 px-6 rounded-[12px] flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
    >
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3C6.477 3 2 6.477 2 10.8C2 13.477 3.523 15.842 5.94 17.347L4.934 20.853C4.865 21.112 5.135 21.314 5.361 21.173L9.577 18.569C10.353 18.707 11.163 18.78 12 18.78C17.523 18.78 22 15.303 22 10.98C22 6.657 17.523 3 12 3Z"
          fill="#000000"
        />
      </svg>
      <span className="text-[12px] sm:text-[16px]">카카오 로그인</span>
    </button>
  );
};

export default KakaoLoginButton;
