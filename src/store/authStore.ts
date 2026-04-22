import { create } from 'zustand';
import { getMe, type User } from '../api/user';

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  checkAuth: () => Promise<void>;
  setLoggedOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token || token === 'undefined') {
      set({ isLoggedIn: false, user: null });
      return;
    }
    try {
      const user = await getMe();
      set({ isLoggedIn: true, user });
    } catch {
      set({ isLoggedIn: false, user: null });
    }
  },

  setLoggedOut: () => set({ isLoggedIn: false, user: null }),
}));
