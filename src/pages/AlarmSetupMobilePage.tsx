import { CheckCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/shared/components/shadcn/button';
import { useSearchParams } from 'react-router-dom';
import { useAlarmPermission } from '@/features/webpush/hooks/useAlarmPermission';
import { STATUS_CONTENT } from '@/features/webpush/constants/alarmStatusContent';
import { WebPushStatus, type WebPushStatusType } from '@/features/webpush/types/pushApiTypes';
import { useConnectPushSessionMutation } from '@/features/webpush/hooks/useConnectPushSessionMutation';
import { getIsIOS, getIsStandalone } from '@/features/webpush/utils/deviceUtil';
import { supportsWebPush } from '@/features/webpush/utils/pushSupportUtil';
import StatusView from '@/features/webpush/components/StatusView';
import {
  disabledMessageMap,
  type DisabledReasonType,
} from '@/features/webpush/constants/disableReason';
import IOSGuide from '@/features/webpush/components/IOSGuide';

const AlarmSetupMobilePage = () => {
  const [params] = useSearchParams();
  const qrToken = params.get('token');
  const { mutate: connectPushSession } = useConnectPushSessionMutation();
  const { registerPushSubscription, isLoading } = useAlarmPermission(qrToken);

  const [permission, setPermission] = useState<WebPushStatusType>(WebPushStatus.CREATED);

  const triedConnectRef = useRef(false);
  const hasShownError = useRef(false);
  const isQrValid = Boolean(qrToken);
  const isWebPushSupported = supportsWebPush();
  const isIOSNotStandalone = getIsIOS() && !getIsStandalone();

  const isAllowDisabled =
    isLoading ||
    permission !== WebPushStatus.CREATED ||
    !isQrValid ||
    !isWebPushSupported ||
    isIOSNotStandalone;

  const getDisabledReason = (): DisabledReasonType | null => {
    if (!isQrValid) return 'INVALID_QR';
    if (isIOSNotStandalone) return 'IOS_NOT_STANDALONE';
    if (!isWebPushSupported) return 'NOT_SUPPORTED';
    return null;
  };

  const disableReason = getDisabledReason();

  useEffect(() => {
    if (!qrToken && !hasShownError.current) {
      toast.error('유효하지 않은 QR 코드입니다.');
      hasShownError.current = true;
      return;
    }
    if (isIOSNotStandalone) {
      return;
    }
    if (!isWebPushSupported) {
      toast.error('이 브라우저는 알림 기능을 지원하지 않습니다.');
      return;
    }

    if (qrToken && !triedConnectRef.current) {
      triedConnectRef.current = true;
      const deviceInfo = navigator.userAgent;
      connectPushSession({ token: qrToken, deviceInfo });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrToken]);

  const handleAllow = async () => {
    const success = await registerPushSubscription();
    if (success) setPermission(WebPushStatus.REGISTERED);
  };

  const status = STATUS_CONTENT[permission];
  const shouldShowButton = permission === WebPushStatus.CREATED;

  return (
    <StatusView
      icon={status.icon}
      title={status.title}
      message={status.message}
      blurClass={status.blurClass}
      bgClass={status.bgClass}
      textClass={status.textClass}
    >
      {disableReason === 'IOS_NOT_STANDALONE' && <IOSGuide />}

      {shouldShowButton && (
        <div className="space-y-2.5 pt-2 w-full max-w-xs mx-auto">
          <Button
            onClick={handleAllow}
            disabled={isAllowDisabled}
            className="w-full py-6 bg-boost-blue hover:bg-boost-blue-hover active:bg-boost-blue-pressed text-gray-100 title2-bold duration-300 shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle className="w-4 h-4" />
            {isLoading ? '처리 중...' : '허용'}
          </Button>
          {disableReason && (
            <p className="text-xs text-gray-500 mt-2">{disabledMessageMap[disableReason]}</p>
          )}
        </div>
      )}
    </StatusView>
  );
};

export default AlarmSetupMobilePage;
