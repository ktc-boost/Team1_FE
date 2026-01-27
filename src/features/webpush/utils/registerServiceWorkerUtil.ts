export const registerServiceWorker = async (
  swPath = '/service-worker.js',
): Promise<ServiceWorkerRegistration> => {
  const registration = await navigator.serviceWorker.register(swPath);
  return registration;
};
