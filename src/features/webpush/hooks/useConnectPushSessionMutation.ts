import { webPushApi } from '@/features/webpush/api/webPushApi';
import type {
  ConnectPushSessionRequest,
  ConnectPushSessionResponse,
} from '@/features/webpush/types/pushApiTypes';
import { webPushToast } from '@/features/webpush/utils/toast/webPushToast';
import { useMutation } from '@tanstack/react-query';

export const useConnectPushSessionMutation = () => {
  return useMutation<ConnectPushSessionResponse, Error, ConnectPushSessionRequest>({
    mutationFn: webPushApi.connectSession,
    onSuccess: () => {
      webPushToast.connectSuccess();
    },
    onError: () => {
      webPushToast.connectFailed();
    },
  });
};
