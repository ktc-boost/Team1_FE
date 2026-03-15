import * as Sentry from '@sentry/react';
import type { User } from '@/features/user/types/userTypes';
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  setAuth: (payload: { user?: Partial<User>; accessToken?: string }) => void;
  clearAuth: () => void;
  isInitializing: boolean;
  setIsInitializing: (status: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isInitializing: true,
  setIsInitializing: (status) => set({ isInitializing: status }),
  setAuth: ({ user, accessToken }) =>
    set((prevState) => {
      const newUser = user ? ({ ...prevState.user, ...user } as User) : prevState.user;

      if (newUser && newUser.id && newUser.name) {
        Sentry.setUser({
          id: newUser.id,
          username: newUser.name,
        });
      }

      return {
        user: newUser,
        accessToken: accessToken ?? prevState.accessToken,
      };
    }),
  clearAuth: () => {
    Sentry.setUser(null);
    set({ user: null, accessToken: null });
  },
}));
