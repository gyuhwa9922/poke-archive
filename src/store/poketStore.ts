import { create } from 'zustand';
import { fetchMyPocketMons, poketmonReg, poketmonDelete } from '../api/poket';

interface PoketState {
  bookmarkedIds: number[];
  fetchBookmarkedIds: () => Promise<void>;
  addBookmark: (id: number) => Promise<boolean>;
  removeBookmark: (id: number) => Promise<boolean>;
}

export const usePoketStore = create<PoketState>((set) => ({
  bookmarkedIds: [],

  fetchBookmarkedIds: async () => {
    const token = localStorage.getItem('token');
    if (!token || token === 'undefined') return;
    try {
      const ids = await fetchMyPocketMons();
      set({ bookmarkedIds: ids });
    } catch {
      set({ bookmarkedIds: [] });
    }
  },

  addBookmark: async (id) => {
    const ok = await poketmonReg(id);
    if (ok) set((state) => ({ bookmarkedIds: [...state.bookmarkedIds, id] }));
    return ok;
  },

  removeBookmark: async (id) => {
    const ok = await poketmonDelete(id);
    if (ok) set((state) => ({ bookmarkedIds: state.bookmarkedIds.filter((b) => b !== id) }));
    return ok;
  },
}));
