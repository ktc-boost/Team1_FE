import type { AxiosProgressEvent } from 'axios';

export const calculateTimeLeft = (progressEvent: AxiosProgressEvent, startTime: number) => {
  const total = progressEvent.total || 0;
  const loaded = progressEvent.loaded;
  const elapsed = (Date.now() - startTime) / 1000;
  const speed = loaded / elapsed;
  const remainingBytes = total - loaded;

  if (speed <= 0) return '계산 중...';

  const remainingSeconds = Math.round(remainingBytes / speed);

  if (remainingSeconds < 60) return `${remainingSeconds} sec left `;
  const minutes = Math.floor(remainingSeconds / 60);
  return `${minutes} min  left `;
};
