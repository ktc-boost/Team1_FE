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
    <div className="h-dvh flex flex-row overflow-hidden">
      <NotificationExamples position="left" />
      {/* 중앙 QR 영역 */}
      <section
        aria-label="QR code setup instructions"
        className="h-full flex flex-1 flex-col items-center gap-6 pt-6 sm:pt-20 box-border"
      >
        <div className="flex flex-col items-center gap-4 w-full">
          <QRCodeSection isPending={isPending} qrData={qrData} timeLeft={timeLeft} />
          <Button
            variant="link"
            onClick={handleSkip}
            className="z-10 mt-[-20px] cursor-pointer text-gray-500"
          >
            다음에 할래요
          </Button>
        </div>

        <div aria-label="image" className="mt-auto flex shrink-0 flex-col items-center pb-2">
          <div aria-label="mockup" className="relative w-[400px] md:w-[640px] flex justify-center">
            <motion.img
              src={AlarmBell}
              alt="alarm-bell"
              className="absolute w-30 sm:w-36 h-auto right-4 top-0"
              variants={shakeVariant}
              animate="animate"
            />
            <img
              src={BooAlarmClick}
              alt="alarm-mockup"
              className="select-none mx-auto w-[300px] sm:w-[400px]"
            />
          </div>
        </div>
      </section>
      <NotificationExamples position="right" />
      {/* 오른쪽 알림 예시 */}
    </div>
  );
};

export default AlarmSetupPage;
