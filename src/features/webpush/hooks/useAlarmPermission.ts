import toast from 'react-hot-toast';
import { webPushApi } from '@/features/webpush/api/webPushApi';
import { WebPushStatus } from '@/features/webpush/types/pushApiTypes';
import { registerServiceWorker } from '@/features/webpush/utils/registerServiceWorkerUtil';
import { getOrCreatePushSubscription } from '@/features/webpush/utils/getOrCreatePushSubscriptionUtil';
import { buildPushSubscriptionRequest } from '@/features/webpush/utils/buildPushSubscriptionRequestUtil';
import { requestNotificationPermission } from '@/features/webpush/utils/requestNotificationPermissionUtil';
import { supportsWebPush } from '@/features/webpush/utils/pushSupportUtil';
import { useState } from 'react';

export const useAlarmPermission = (token: string | null) => {
  const [isLoading, setIsLoading] = useState(false);

  const registerPushSubscription = async (): Promise<boolean> => {
    if (!token) {
      toast.error('QR 토큰이 유효하지 않습니다.');
      return false;
    }
    if (!supportsWebPush()) {
      toast.error('이 브라우저는 알림 기능을 지원하지 않습니다.');
      return false;
    }
    setIsLoading(true);
    try {
      const permission = await requestNotificationPermission();

      if (permission === 'denied') {
        toast.error('알림이 차단되었습니다. 브라우저 설정에서 알림을 허용해주세요.');
        return false;
      }
      if (permission !== 'granted') {
        toast('알림 요청이 취소되었습니다. 다시 시도해주세요.');
        return false;
      }
      const registration = await registerServiceWorker();
      const subscription = await getOrCreatePushSubscription(registration);
      if (!subscription) throw new Error('Subscription failed');

      const request = buildPushSubscriptionRequest(token, subscription);
      const response = await webPushApi.registerSubscription(request);

      const isSuccess = response.status === WebPushStatus.REGISTERED;
      if (!isSuccess) {
        toast.error('서버 구독 등록에 실패했습니다.');
        return false;
      }

      return true;
    } catch (error) {
      console.error('[registerPushSubscription error]', error);
      toast.error('알림 권한 설정 중 오류가 발생했습니다.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { registerPushSubscription, isLoading };
};
