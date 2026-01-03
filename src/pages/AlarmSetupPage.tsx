import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { AlarmClock, ArrowDown, BellRing, SquareCheck } from 'lucide-react';
import BooAlarmClick from '@/shared/assets/images/boost/boo-with-alarm.png';
import AlarmBell from '@/shared/assets/images/boost/alarm-bell.png';
import CircleBox from '@/shared/components/ui/CircleBox';
import { floatVariant, shakeVariant } from '@/shared/utils/animations/motionVariants';
import { useCreatePushSessionMutation } from '@/features/webpush/hooks/useCreatePushSessionMutation';
import toast from 'react-hot-toast';
import { ROUTE_PATH } from '@/app/routes/Router';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePushSessionStatusQuery } from '@/features/webpush/hooks/usePushSessionStatusQuery';
import { WebPushStatus } from '@/features/webpush/types/pushApiTypes';
import { useEnableServiceAlarmMutation } from '@/features/webpush/hooks/useEnableServiceAlarmMutation';
import { Button } from '@/shared/components/shadcn/button';
import InlineLoader from '@/shared/components/ui/loading/InlineLoader';

const INTERVAL_MS = 30 * 10000;

const AlarmSetupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;

  const hasHandledStatus = useRef(false);

  const {
    mutate: createPushSession,
    data,
    isPending,
  } = useCreatePushSessionMutation({
    onSuccess: (res) => {
      setQrToken(res.token);
      setRemainingTime(INTERVAL_MS / 1000);
    },
    onError: () => {
      toast.error('QR 세션 생성에 실패했습니다. 잠시 후 다시 시도해주세요.');
    },
  });
  const { data: statusData } = usePushSessionStatusQuery(data?.token);
  const [qrToken, setQrToken] = useState<string | null>(null);
  const [remainingTime, setRemainingTime] = useState(INTERVAL_MS / 1000);
  const { mutate: enableServiceAlarm } = useEnableServiceAlarmMutation();

  // QR 데이터 URL 생성
  const qrData = qrToken
    ? `${window.location.origin}${ROUTE_PATH.ALARM_SETUP_MOBILE}?token=${qrToken}`
    : '';

  // REGISTERD → 리디렉션
  useEffect(() => {
    if (!statusData?.status) return;
    if (statusData.status === WebPushStatus.REGISTERED && !hasHandledStatus.current) {
      hasHandledStatus.current = true;
      enableServiceAlarm();
      toast.success('알림이 활성화되었습니다!');
      navigate(ROUTE_PATH.MY_TASK);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusData?.status, navigate]);

  // 세션 생성 + 5분마다 갱신 + 카운트다운
  useEffect(() => {
    createPushSession();
    setRemainingTime(INTERVAL_MS / 1000);

    const interval = setInterval(() => {
      createPushSession();
      setRemainingTime(INTERVAL_MS / 1000);
    }, INTERVAL_MS);

    const countdown = setInterval(() => {
      setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(countdown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

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
          {isPending && !data ? (
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
        <p className="text-gray-700 font-semibold text-sm">
          QR 갱신까지 남은 시간: {minutes}:{seconds.toString().padStart(2, '0')}
        </p>

        <Button
          variant="link"
          onClick={() => {
            if (from === ROUTE_PATH.AVATAR) navigate(ROUTE_PATH.MY_TASK);
            else if (from === ROUTE_PATH.SETTINGS) navigate(ROUTE_PATH.SETTINGS);
            else navigate(ROUTE_PATH.MY_TASK);
          }}
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
