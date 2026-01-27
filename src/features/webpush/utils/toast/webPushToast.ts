import toast from 'react-hot-toast';
import { WebPushStatus, type WebPushStatusType } from '@/features/webpush/types/pushApiTypes';

export const WEBPUSH_TOAST_MESSAGE = {
  setup: {
    createSessionFailed: 'QR 세션 생성에 실패했습니다. 잠시 후 다시 시도해주세요.',
    settings: {
      enableSuccess: '이제 웹푸시를 받아볼 수 있습니다.',
      enableFailed: '설정 페이지에서 웹푸시 알림을 켤 수 있습니다.',
    },
  },
  mobile: {
    token: {
      invalid: 'QR 토큰이 유효하지 않습니다.',
    },
    support: {
      notSupported: '이 브라우저는 알림 기능을 지원하지 않습니다.',
    },
    session: {
      connectSuccess: 'QR 연결에 성공했습니다.',
      connectFailed: 'QR 연결에 실패했습니다. QR을 다시 스캔해주세요.',
    },
    permission: {
      denied: '알림이 차단되었습니다. 브라우저 설정에서 알림을 허용해주세요.',
      dismissed: '알림 요청이 취소되었습니다. 다시 시도해주세요.',
      unexpected: '알림 권한 설정 중 오류가 발생했습니다.',
    },
    subscription: {
      failed: '푸시 구독 생성에 실패했습니다.',
    },
    server: {
      registerFailed: '서버 구독 등록에 실패했습니다.',
    },
  },
} as const;

type PermissionResult = NotificationPermission | 'default';

export const webPushToast = {
  // 알림설정
  createFailed: () => toast.error(WEBPUSH_TOAST_MESSAGE.setup.createSessionFailed),

  enableSuccess: () => toast.success(WEBPUSH_TOAST_MESSAGE.setup.settings.enableSuccess),
  enableFailed: () => toast.error(WEBPUSH_TOAST_MESSAGE.setup.settings.enableFailed),

  // 알림설정 - 모바일
  invalidToken: () => toast.error(WEBPUSH_TOAST_MESSAGE.mobile.token.invalid),

  notSupported: () => toast.error(WEBPUSH_TOAST_MESSAGE.mobile.support.notSupported),

  connectSuccess: () => toast.success(WEBPUSH_TOAST_MESSAGE.mobile.session.connectSuccess),
  connectFailed: () => toast.error(WEBPUSH_TOAST_MESSAGE.mobile.session.connectFailed),

  permissionDenied: () => toast.error(WEBPUSH_TOAST_MESSAGE.mobile.permission.denied),
  permissionDismissed: () => toast(WEBPUSH_TOAST_MESSAGE.mobile.permission.dismissed),

  subscriptionFailed: () => toast.error(WEBPUSH_TOAST_MESSAGE.mobile.subscription.failed),

  registerFailed: () => toast.error(WEBPUSH_TOAST_MESSAGE.mobile.server.registerFailed),

  unexpected: () => toast.error(WEBPUSH_TOAST_MESSAGE.mobile.permission.unexpected),

  handlePermissionResult: (permission: PermissionResult) => {
    if (permission === 'denied') {
      webPushToast.permissionDenied();
      return false;
    }
    if (permission !== 'granted') {
      webPushToast.permissionDismissed();
      return false;
    }
    return true;
  },

  isRegistered: (status: WebPushStatusType) => status === WebPushStatus.REGISTERED,
} as const;
