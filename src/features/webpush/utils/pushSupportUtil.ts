export const supportsServiceWorker = () => {
  return typeof navigator !== 'undefined' && 'serviceWorker' in navigator;
};

export const supportsWebPush = () => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;

  return 'Notification' in window && 'PushManager' in window && 'serviceWorker' in navigator;
};
