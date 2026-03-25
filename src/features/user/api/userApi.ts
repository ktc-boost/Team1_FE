import { api } from '@/shared/api/axiosInstance';
import type { User } from '@/features/user/types/userTypes';

export const memberApi = {
  // 내 정보 조회
  fetchMyInfo: async (): Promise<User> => {
    const res = await api.get('/members/me');
    return res.data;
  },

  // 내 정보 수정
  updateMemberInfo: async (payload: { name?: string; avatar?: string }): Promise<User> => {
    const res = await api.put('/members/me', payload);
    return res.data;
  },

  // 회원 탈퇴
  deleteMember: async () => {
    const res = await api.delete('/members/me');
    return res.data;
  },
};
