import { motion } from 'framer-motion';
import { AlarmClock, BellRing, SquareCheck } from 'lucide-react';
import BooAlarmClick from '@/shared/assets/images/boost/boo-with-alarm.png';
import AlarmBell from '@/shared/assets/images/boost/alarm-bell.png';
import CircleBox from '@/shared/components/ui/CircleBox';
import { floatVariant, shakeVariant } from '@/shared/utils/animations/motionVariants';
import { Button } from '@/shared/components/shadcn/button';
import { useAlarmSetup } from '@/features/webpush/hooks/useAlarmSetup';
import QRCodeSection from './../features/webpush/components/QRCodeSection';

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
        <QRCodeSection isPending={isPending} qrData={qrData} timeLeft={timeLeft} />
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
