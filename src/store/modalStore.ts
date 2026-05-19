import { create } from 'zustand';

type ModalType = 'alert' | 'confirm' | 'prompt';
type ColorType = 'default' | 'danger';

type ModalResult = void | boolean | string | null;

interface OpenModalOptions {
  title: string;
  desc: string;
  modalType: ModalType;
  colorType?: ColorType;
  inputType?: string;
}

interface ModalState {
  isOpen: boolean;
  title: string;
  desc: string;
  modalType: ModalType;
  colorType: ColorType;
  inputType: string;
  inputValue: string;
  resolver: ((value: ModalResult) => void) | null;

  openModal: (options: OpenModalOptions) => Promise<ModalResult>;
  closeModal: () => void;
  confirmModal: () => void;
  cancelModal: () => void;
  setInputValue: (value: string) => void;
}

const initialModalState = {
  isOpen: false,
  title: '알림',
  desc: '',
  modalType: 'alert' as ModalType,
  colorType: 'default' as ColorType,
  inputType: 'text',
  inputValue: '',
  resolver: null,
};

export const useModalStore = create<ModalState>((set, get) => ({
  ...initialModalState,

  openModal: ({ title, desc, modalType, colorType = 'default', inputType = 'text' }) => {
    return new Promise<ModalResult>((resolve) => {
      set({
        isOpen: true,
        title,
        desc,
        modalType,
        colorType,
        inputType,
        inputValue: '',
        resolver: resolve,
      });
    });
  },

  closeModal: () => {
    set(initialModalState);
  },

  confirmModal: () => {
    const { modalType, inputValue, resolver } = get();

    if (modalType === 'prompt') {
      resolver?.(inputValue.trim() || null);
    } else if (modalType === 'confirm') {
      resolver?.(true);
    } else {
      resolver?.();
    }

    set(initialModalState);
  },

  cancelModal: () => {
    const { modalType, resolver } = get();

    if (modalType === 'prompt') {
      resolver?.(null);
    } else if (modalType === 'confirm') {
      resolver?.(false);
    } else {
      resolver?.();
    }

    set(initialModalState);
  },

  setInputValue: (value) => {
    set({ inputValue: value });
  },
}));

// 알림 모달
export function showModal(
  title: string,
  desc: string,
  type: ColorType = 'default',
): Promise<void> {
  return useModalStore
    .getState()
    .openModal({
      title,
      desc,
      modalType: 'alert',
      colorType: type,
    }) as Promise<void>;
}

// 확인/취소 모달
export function showConfirm(title: string, desc: string): Promise<boolean> {
  return useModalStore
    .getState()
    .openModal({
      title,
      desc,
      modalType: 'confirm',
      colorType: 'default',
    }) as Promise<boolean>;
}

// 입력 모달
export function showPrompt(title: string, desc: string, inputType = 'text'): Promise<string | null> {
  return useModalStore
    .getState()
    .openModal({
      title,
      desc,
      modalType: 'prompt',
      colorType: 'default',
      inputType,
    }) as Promise<string | null>;
}