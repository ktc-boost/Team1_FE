// yyyy-mm-dd -> ["yyyy", "mm", "dd"]
export const parseDateString = (dateString: string) => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

// yyyy-mm-dd
export const formatDate = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

// D-Day, N일 남음
export const calculateDDay = (
  dueDate?: string | null,
  format: 'number' | 'string' | 'text' = 'number',
) => {
  if (!dueDate) return null;

  const due = new Date(dueDate);
  const today = new Date();

  due.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diff = Math.round((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (format === 'number') {
    return diff;
  }

  if (format === 'string') {
    if (diff === 0) return 'D-DAY';
    return diff > 0 ? `D-${diff}` : `D+${Math.abs(diff)}`;
  }

  if (format === 'text') {
    if (diff === 0) return '오늘 마감';
    return diff > 0 ? `${diff}일 남음` : `${Math.abs(diff)}일 지남`;
  }

  return diff;
};

// yyyy년 mm월 dd일 오전 hh:mm
export const formatDateTime = (isoString: string): string => {
  if (!isoString) return '';

  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'Asia/Seoul',
  };

  return new Intl.DateTimeFormat('ko-KR', options).format(date);
};

// 초 단위 숫자를 HH:MM:SS로 변환
export const formatSecondsToHHMMSS = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// 초 단위 숫자를 MM:SS로 변환
export const formatSecondsMMSS = (seconds: number) => {
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// 만료일과 현재 시간으로 남은 초 계산
export const getRemainingSeconds = (expiresAt: string | Date) => {
  const expires = new Date(expiresAt).getTime();
  const now = Date.now();
  return Math.max(Math.floor((expires - now) / 1000), 0);
};

// 오늘인지 구하는 함수
export const isToday = (dateStr: string) => {
  const d = new Date(dateStr);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
};

// ex) 3월 12일 오후 03:40
export const formatShortDateTime = (isoString: string) => {
  const date = new Date(isoString);

  return date.toLocaleString('ko-KR', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
