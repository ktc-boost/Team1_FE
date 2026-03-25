import { api, apiPublic } from '@/shared/api/axiosInstance';
import type {
  CreatePushSessionResponse,
  GetPushSessionStatusResponse,
  ConnectPushSessionRequest,
  ConnectPushSessionResponse,
  PushSubscriptionRequest,
  PushSubscriptionResponse,
} from '@/features/webpush/types/pushApiTypes';

export const webPushApi = {
  // 웹푸시 세션 생성
  createSession: async (): Promise<CreatePushSessionResponse> => {
    const { data } = await api.post('/web-push/sessions');
    return data;
  },

  //  웹푸시 상태 조회 (polling으로 연결 상태 확인)
  getSessionStatus: async (token: string): Promise<GetPushSessionStatusResponse> => {
    const { data } = await api.get(`/web-push/sessions/${token}`);
    return data;
  },

  //  모바일에서 QR 스캔 시 세션 연결
  connectSession: async (
    payload: ConnectPushSessionRequest,
  ): Promise<ConnectPushSessionResponse> => {
    const { data } = await apiPublic.post('/web-push/sessions/connect', payload);
    return data;
  },

  //  웹푸시 구독 등록 (사용자 알림 허용 시)
  registerSubscription: async (
    payload: PushSubscriptionRequest,
  ): Promise<PushSubscriptionResponse> => {
    const { data } = await apiPublic.post('/web-push/subscriptions', payload);
    return data;
  },
};
