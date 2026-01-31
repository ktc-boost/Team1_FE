import { motion } from 'framer-motion';
import BooAlarmClick from '@/shared/assets/images/boost/boo-with-alarm.png';
import AlarmBell from '@/shared/assets/images/boost/alarm-bell.png';
import { shakeVariant } from '@/shared/utils/animations/motionVariants';
import { Button } from '@/shared/components/shadcn/button';
import { useAlarmSetup } from '@/features/webpush/hooks/useAlarmSetup';
import NotificationExamples from '@/features/webpush/components/NotificationExamples';
import QRCodeSection from '@/features/webpush/components/QRCodeSection';

const AlarmSetupPage = () => {
  const { qrData, isPending, timeLeft, handleSkip } = useAlarmSetup();
  return (
    <div className="flex flex-row  h-screen overflow-hidden">
      <NotificationExamples position="left" />
      {/* 중앙 QR 영역 */}
      <section
        aria-label="QR code setup instructions"
        className="flex flex-col items-center justify-between gap-6 w-[50%] pt-20 box-border"
      >
        <div className="flex flex-col items-center gap-4 w-full">
          <QRCodeSection isPending={isPending} qrData={qrData} timeLeft={timeLeft} />
          <Button
            variant="link"
            onClick={() => handleSkip()}
            className="z-10 mt-[-20px] cursor-pointer text-gray-500"
          >
            다음에 할래요
          </Button>
        </div>
        {/* 중앙 이미지 */}
        <div aria-label="image" className="flex flex-col items-center ">
          <div aria-label="mockup" className="relative w-[400px] md:w-[640px]  mt-[-30px]">
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
      <NotificationExamples position="right" />
    </div>
  );
};

export default AlarmSetupPage;
