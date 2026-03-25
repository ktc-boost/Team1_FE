import { api } from '@/shared/api/axiosInstance';
import type { MyInfoResponse } from '@/features/settings/types/settingsTypes';
import type { AvatarInfo } from '@/features/user/types/userTypes';

export const settingsApi = {
  // 회원 조회
  getMyInfo: async (): Promise<MyInfoResponse> => {
    const { data } = await api.get('/members/me');
    return data;
  },

  // 이름 수정
  updateName: async (name: string): Promise<void> => {
    await api.put('/members/me/name', { name });
  },

  // 아바타 수정
  updateAvatar: async ({ avatar, backgroundColor }: AvatarInfo): Promise<AvatarInfo> => {
    const res = await api.put('/members/me/avatar', {
      avatar,
      backgroundColor,
    });
    return res.data;
  },

  // 회원 탈퇴
  deleteAccount: async (): Promise<void> => {
    await api.delete('/members/me');
  },
};
