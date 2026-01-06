import { ROUTE_PATH } from '@/app/routes/Router';
import { REFRESH_INTERVAL_MS } from '@/features/webpush/constants/qrConstants';
import { useCreatePushSessionMutation } from '@/features/webpush/hooks/useCreatePushSessionMutation';
import { useEnableServiceAlarmMutation } from '@/features/webpush/hooks/useEnableServiceAlarmMutation';
import { usePushSessionStatusQuery } from '@/features/webpush/hooks/usePushSessionStatusQuery';
import { WebPushStatus } from '@/features/webpush/types/pushApiTypes';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
export const useAlarmSetup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasHandledStatus = useRef(false);

  const {
    mutate: createPushSession,
    data,
    isPending,
  } = useCreatePushSessionMutation({
    onSuccess: () => {
      const now = Date.now();
      setExpiryTimestamp(now + REFRESH_INTERVAL_MS);
    },
    onError: () => {
      toast.error('QR 세션 생성에 실패했습니다. 잠시 후 다시 시도해주세요.');
    },
  });
  const { data: statusData } = usePushSessionStatusQuery(data?.token);
  const { mutate: enableServiceAlarm } = useEnableServiceAlarmMutation();
  const [expiryTimestamp, setExpiryTimestamp] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(REFRESH_INTERVAL_MS / 1000);
  // QR 데이터 URL 생성
  const qrData = data?.token
    ? `${window.location.origin}${ROUTE_PATH.ALARM_SETUP_MOBILE}?token=${data.token}`
    : '';

  // REGISTERD → 리디렉션
  useEffect(() => {
    if (statusData?.status === WebPushStatus.REGISTERED && !hasHandledStatus.current) {
      hasHandledStatus.current = true;
      enableServiceAlarm();
      toast.success('알림이 활성화되었습니다!');
      navigate(ROUTE_PATH.MY_TASK);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusData?.status, navigate]);

  // 세션 생성 + 5분마다 QR 생성
  useEffect(() => {
    createPushSession();

    const sessionInterval = setInterval(() => {
      createPushSession();
    }, REFRESH_INTERVAL_MS);

    return () => clearInterval(sessionInterval);
  }, [createPushSession]); // 의존성 배열에 왜 넣는냐??

  useEffect(() => {
    if (!expiryTimestamp) return;
    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((expiryTimestamp - now) / 1000));
      setRemainingTime(diff);
    };
    updateTimer();
    const countdownInterval = setInterval(updateTimer, 1000);
    return () => clearInterval(countdownInterval);
  }, [expiryTimestamp]);
  const minutes = Math.floor(remainingTime / 60);
  const seconds = Math.floor(remainingTime % 60);
  const timeLeft = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  // useCallback 이 없을 때. 타이머 때문에 1초마다 숫자가 바뀔때마다 useAlarmpermission 훅이 호출 됨. handleSkip도 새로 만들어짐
  const handleSkip = useCallback(() => {
    const from = location.state?.from;
    if (from === ROUTE_PATH.AVATAR || from === ROUTE_PATH.SETTINGS) {
      navigate(from);
    } else {
      navigate(ROUTE_PATH.MY_TASK);
    }
  }, [navigate, location.state?.from]);
  return { qrData, isPending: isPending && !data, timeLeft, handleSkip };
};
