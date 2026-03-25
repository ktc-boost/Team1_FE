import { Button } from '@/shared/components/shadcn/button';
import MovingBoo from '@/shared/components/ui/MovingBoo';
import { EXTERNAL_LINKS } from '@/shared/constants/external-links';
import BubbleDecoration from '@/features/inquire/components/BubbleDecoration';

const InquireModalContent = () => {
  const handleKakaoInquireClick = () => window.open(EXTERNAL_LINKS.KAKAO_CHAT, '_blank');
  const handleNaverformInquireClick = () => window.open(EXTERNAL_LINKS.NAVER_FORM, '_blank');

  return (
    <div className="flex flex-col items-center gap-4">
      <MovingBoo size={36} />

      <p className="text-center text-gray-700 label1-regular leading-relaxed">
        어떤 방법으로 문의하시겠어요?
      </p>

      <div className="flex gap-2 mt-5 w-full">
        <div className="flex-1">
          <BubbleDecoration content="실시간 응답" />
          <Button
            variant="defaultBoost"
            onClick={handleKakaoInquireClick}
            className="w-full rounded-full py-5 mt-2"
          >
            카카오톡
          </Button>
        </div>

        <div className="flex-1">
          <BubbleDecoration content="상세한 문의" />
          <Button
            variant="secondaryBoost"
            onClick={handleNaverformInquireClick}
            className="w-full rounded-full py-5 mt-2"
          >
            네이버폼
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InquireModalContent;
