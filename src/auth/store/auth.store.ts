import { create } from 'zustand';

import type { User } from '@/interfaces/user.interface';
import { loginAction } from '../actions/login.action';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

type AuthState = {
  //Properties
  user: User | null;
  token: string | null;
  authSatus: AuthStatus;
  
  // Getters
  // isAdmin: boolean;

  // Actions

  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
  // Implementacion del Store
  user: null,
  token: null,
  authSatus: 'checking',
  // isAdmin: false,

  // Actions
  login: async (email: string, password: string) => {
    console.log({ email, password });

    try {
      const data = await loginAction(email, password);
      localStorage.setItem('token', data.token);

      set({
        user: data.user,
        token: data.token,
      });
      return true;
    } catch (error) {
      localStorage.removeItem('token');

      set({
        user: null,
        token: null,
      });
      console.error('Login error:', error);
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');

    set({
      user: null,
      token: null,
    });
  },
}));
