import { notificationsApi } from '@/features/notifications/api/notificationsApi';
import { webPushToast } from '@/features/webpush/ui/toast/webPushToast';
import { useMutation } from '@tanstack/react-query';

export const useEnableServiceAlarmMutation = () => {
  return useMutation({
    mutationFn: () => notificationsApi.updateNotificationSettings(true),

    onSuccess: () => {
      webPushToast.enableSuccess();
    },

    onError: () => {
      webPushToast.enableFailed();
    },
  });
};
