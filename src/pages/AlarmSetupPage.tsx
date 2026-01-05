import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { AlarmClock, ArrowDown, BellRing, SquareCheck } from 'lucide-react';
import BooAlarmClick from '@/shared/assets/images/boost/boo-with-alarm.png';
import AlarmBell from '@/shared/assets/images/boost/alarm-bell.png';
import CircleBox from '@/shared/components/ui/CircleBox';
import { floatVariant, shakeVariant } from '@/shared/utils/animations/motionVariants';
import { Button } from '@/shared/components/shadcn/button';
import InlineLoader from '@/shared/components/ui/loading/InlineLoader';
import { useAlarmSetup } from '@/features/webpush/hooks/useAlarmSetup';

const AlarmSetupPage = () => {
  const { qrData, isPending, timeLeft, handleSkip } = useAlarmSetup();
  return (
    <div className="flex flex-row h-screen overflow-hidden">
      {/* 왼쪽 알림 예시 */}
      <section
        aria-label="Notification examples"
        className="flex flex-col justify-between items-center w-[25%] h-full pl-20 py-24 mr-5 box-border"
      >
        <CircleBox
          className="mr-14 bg-boost-yellow"
          variants={floatVariant}
          custom={10}
          animate="animate"
        >
          <BellRing />
          <p>
            할 일이 <br /> 생겼어요!
          </p>
        </CircleBox>

        <CircleBox
          className="ml-24 mb-10 bg-boost-blue-light"
          variants={floatVariant}
          custom={-10}
          animate="animate"
        >
          <AlarmClock />
          마감일이 얼마 <br /> 남지 않았어요!
        </CircleBox>
      </section>

      {/* 중앙 QR 영역 */}
      <section
        aria-label="QR code setup instructions"
        className="flex flex-col items-center justify-between gap-6 w-[50%] pt-10 box-border"
      >
        {/* 상단 텍스트 */}
        <div aria-label="text" className="flex flex-col items-center gap-3">
          <div className="text-4xl font-semibold text-center">
            <span className="text-boost-blue-light">알림</span>을 허용해보세요!
          </div>
          <div className="text-gray-600 subtitle1-bold text-center">
            모바일로 하단의 QR 코드를 스캔해주세요!
          </div>
          <ArrowDown className="text-boost-blue-light" />
        </div>

        {/* QR 코드 */}
        <div className="p-4 shadow-md rounded-md bg-white mt-[-20px]">
          {isPending ? (
            <p className="text-gray-500 text-sm text-center w-40 h-40 flex items-center justify-center">
              <InlineLoader size={6} text="QR 코드 생성 중.." />
            </p>
          ) : qrData ? (
            <QRCodeSVG value={qrData} className="w-40 h-40" />
          ) : (
            <p className="text-gray-500 text-sm text-center w-40 h-40 flex items-center justify-center">
              <InlineLoader size={6} text="QR 데이터 불러오는 중.." />
            </p>
          )}
        </div>

        {/* 남은 시간 */}
        <p className="text-gray-700 font-semibold text-sm">QR 갱신까지 남은 시간: {timeLeft}</p>

        <Button
          variant="link"
          onClick={() => handleSkip()}
          className="z-10 mt-[-20px] cursor-pointer text-gray-500"
        >
          다음에 할래요
        </Button>

        {/* 중앙 이미지 */}
        <div aria-label="image" className="flex flex-col items-center">
          <div aria-label="mockup" className="relative w-[640px] mt-[-30px]">
            <motion.img
              src={AlarmBell}
              alt="alarm-bell"
              className="absolute w-36 h-auto right-15"
              variants={shakeVariant}
              animate="animate"
            />
            <img src={BooAlarmClick} alt="alarm-mockup" className="select-none" />
          </div>
        </div>
      </section>

      {/* 오른쪽 알림 예시 */}
      <section
        aria-label="Notification examples"
        className="flex flex-col justify-center items-center w-[25%] h-full px-10 py-20 box-border"
      >
        <CircleBox
          className="mr-14 bg-boost-orange"
          variants={floatVariant}
          custom={10}
          animate="animate"
        >
          <SquareCheck />
          팀원의 작업을 <br /> 승인해주세요!
        </CircleBox>
      </section>
    </div>
  );
};

export default AlarmSetupPage;
