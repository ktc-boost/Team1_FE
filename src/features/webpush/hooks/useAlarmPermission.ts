import { useState } from 'react';
import { webPushApi } from '@/features/webpush/api/webPushApi';
import { WebPushStatus } from '@/features/webpush/types/pushApiTypes';
import { registerServiceWorker } from '@/features/webpush/utils/registerServiceWorkerUtil';
import { getOrCreatePushSubscription } from '@/features/webpush/utils/getOrCreatePushSubscriptionUtil';
import { buildPushSubscriptionRequest } from '@/features/webpush/utils/buildPushSubscriptionRequestUtil';
import { requestNotificationPermission } from '@/features/webpush/utils/requestNotificationPermissionUtil';
import { supportsWebPush } from '@/features/webpush/utils/pushSupportUtil';
import { webPushToast } from '@/features/webpush/ui/toast/webPushToast';

export const useAlarmPermission = (token: string | null) => {
  const [isLoading, setIsLoading] = useState(false);

  const registerPushSubscription = async (): Promise<boolean> => {
    if (!token) {
      webPushToast.invalidToken();
      return false;
    }
    if (!supportsWebPush()) {
      webPushToast.notSupported();
      return false;
    }

    setIsLoading(true);
    try {
      const permission = await requestNotificationPermission();
      if (!webPushToast.handlePermissionResult(permission)) return false;

      const registration = await registerServiceWorker();
      const subscription = await getOrCreatePushSubscription(registration);
      if (!subscription) {
        webPushToast.subscriptionFailed();
        return false;
      }

      const request = buildPushSubscriptionRequest(token, subscription);
      const response = await webPushApi.registerSubscription(request);

      const isSuccess = response.status === WebPushStatus.REGISTERED;
      if (!isSuccess) {
        webPushToast.registerFailed();
        return false;
      }

      return true;
    } catch (error) {
      console.error('[registerPushSubscription error]', error);
      webPushToast.unexpected();
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { registerPushSubscription, isLoading };
};
