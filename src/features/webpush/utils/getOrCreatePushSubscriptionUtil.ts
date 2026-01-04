import { urlBase64ToUint8Array } from '@/features/webpush/utils/urlBase64ToUint8Array';

export const getOrCreatePushSubscription = async (registration: ServiceWorkerRegistration) => {
  const existing = await registration.pushManager.getSubscription();
  if (existing) return existing;
  const created = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(import.meta.env.VITE_VAPID_PUBLIC_KEY),
  });
  return created;
};
