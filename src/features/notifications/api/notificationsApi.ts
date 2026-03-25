import type {
  MarkNotificationAsReadResponse,
  NotificationCountsResponse,
  NotificationsResponse,
} from '@/features/notifications/types/NotificationsType';
import { api } from '@/shared/api/axiosInstance';

export const notificationsApi = {
  fetchNotifications: async (cursor?: string, limit = 6): Promise<NotificationsResponse> => {
    const { data } = await api.get<NotificationsResponse>('/notifications', {
      params: { cursor, limit },
    });
    return data;
  },
  markNotificationAsRead: async (
    notificationId: string,
  ): Promise<MarkNotificationAsReadResponse> => {
    const { data } = await api.patch(`/notifications/${notificationId}/read`);
    return data;
  },
  updateNotificationSettings: async (enabled: boolean) => {
    const { data } = await api.patch('/members/me/notifications', null, {
      params: { enabled },
    });
    return data;
  },
  updateProjectNotificationSettings: async (projectId: string, enabled: boolean) => {
    const { data } = await api.patch(`/projects/${projectId}/notifications`, null, {
      params: { enabled },
    });
    return data;
  },
  fetchNotificationCounts: async (): Promise<NotificationCountsResponse> => {
    const { data } = await api.get('/notifications/count');
    return data;
  },
  markAllNotificationAsRead: async () => {
    await api.patch('/notifications/read-all');
  },
};
