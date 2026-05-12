import { create } from 'zustand';
import type { PartyPreset } from '../api/post';

interface PostWriteState {
  title: string;
  category: string;
  content: string;
  presetId: string;
  imgUrl: string;
  presets: PartyPreset[];
  isSubmitting: boolean;

  setTitle: (title: string) => void;
  setCategory: (category: string) => void;
  setContent: (content: string) => void;
  setPresetId: (presetId: string) => void;
  setImgUrl: (imgUrl: string) => void;
  setPresets: (presets: PartyPreset[]) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;

  resetForm: () => void;
}

export const usePostWriteStore = create<PostWriteState>((set) => ({
  title: '',
  category: '',
  content: '',
  presetId: '',
  imgUrl: '',
  presets: [],
  isSubmitting: false,

  setTitle: (title) => set({ title }),
  setCategory: (category) => set({ category }),
  setContent: (content) => set({ content }),
  setPresetId: (presetId) => set({ presetId }),
  setImgUrl: (imgUrl) => set({ imgUrl }),
  setPresets: (presets) => set({ presets }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),

  resetForm: () =>
    set({
      title: '',
      category: '',
      content: '',
      presetId: '',
      imgUrl: '',
      presets: [],
      isSubmitting: false,
    }),
}));