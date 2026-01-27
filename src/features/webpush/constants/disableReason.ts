export const disabledMessageMap = {
  INVALID_QR: '유효하지 않은 QR 코드입니다.',
  NOT_SUPPORTED: '이 브라우저는 알림을 지원하지 않습니다.',
  IOS_NOT_STANDALONE: 'iOS는 안내를 따른 후 진행해주세요.',
} as const;

export type DisabledReasonType = keyof typeof disabledMessageMap;
