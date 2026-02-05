import { ROUTE_PATH } from '@/app/routes/Router';
import { REFRESH_INTERVAL_MS } from '@/features/webpush/constants/qrConstants';
import { useCreatePushSessionMutation } from '@/features/webpush/hooks/useCreatePushSessionMutation';
import { useEnableServiceAlarmMutation } from '@/features/webpush/hooks/useEnableServiceAlarmMutation';
import { usePushSessionStatusQuery } from '@/features/webpush/hooks/usePushSessionStatusQuery';
import { WebPushStatus } from '@/features/webpush/types/pushApiTypes';
import { webPushToast } from '@/features/webpush/utils/toast/webPushToast';
import { useCallback, useEffect, useRef, useState } from 'react';
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
      webPushToast.connectFailed();
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
  }, [createPushSession]);

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
  const handleSkip = useCallback(() => {
    const from = location.state?.from;
    if (from === ROUTE_PATH.SETTINGS) {
      navigate(from);
    } else {
      navigate(ROUTE_PATH.MY_TASK);
    }
  }, [navigate, location.state?.from]);
  return { qrData, isPending: isPending && !data, timeLeft, handleSkip };
};
