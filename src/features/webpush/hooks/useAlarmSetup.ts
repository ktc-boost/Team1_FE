import { ROUTE_PATH } from '@/app/routes/Router';
import { useCreatePushSessionMutation } from '@/features/webpush/hooks/useCreatePushSessionMutation';
import { useEnableServiceAlarmMutation } from '@/features/webpush/hooks/useEnableServiceAlarmMutation';
import { usePushSessionStatusQuery } from '@/features/webpush/hooks/usePushSessionStatusQuery';
import { WebPushStatus } from '@/features/webpush/types/pushApiTypes';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
const REFRESH_INTERVAL_MS = 5 * 60 * 1000; // 5분 (300,000ms)
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
      setRemainingTime(REFRESH_INTERVAL_MS / 1000);
    },
    onError: () => {
      toast.error('QR 세션 생성에 실패했습니다. 잠시 후 다시 시도해주세요.');
    },
  });
  const { data: statusData } = usePushSessionStatusQuery(data?.token);
  const { mutate: enableServiceAlarm } = useEnableServiceAlarmMutation();
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

  // 세션 생성 + 5분마다 갱신 + 카운트다운
  useEffect(() => {
    createPushSession();
    setRemainingTime(REFRESH_INTERVAL_MS / 1000);

    const interval = setInterval(() => {
      createPushSession();
      setRemainingTime(REFRESH_INTERVAL_MS / 1000);
    }, REFRESH_INTERVAL_MS);

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
