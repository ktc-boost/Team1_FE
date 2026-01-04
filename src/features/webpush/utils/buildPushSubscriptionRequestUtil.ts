import { normalizeSubscription } from '@/features/notifications/utils/normalizeSubscription';
import type { PushSubscriptionRequest } from '@/features/webpush/types/pushApiTypes';

export const buildPushSubscriptionRequest = (
  token: string,
  subscription: PushSubscription,
): PushSubscriptionRequest => {
  const normalized = normalizeSubscription(subscription.toJSON());

  return {
    token,
    webPushUrl: normalized.endpoint,
    publicKey: normalized.keys.p256dh,
    authKey: normalized.keys.auth,
  };
};
