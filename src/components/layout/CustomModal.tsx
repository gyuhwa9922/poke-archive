import { useEffect, useRef, useState } from 'react';
import { useModalStore } from '../../store/modalStore';

const CustomModal = () => {
  const {
    isOpen,
    title,
    desc,
    modalType,
    colorType,
    inputType,
    inputValue,
    confirmModal,
    cancelModal,
    setInputValue,
  } = useModalStore();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [showPasswordVisible, setShowPasswordVisible] = useState(false);

  useEffect(() => {
    if (isOpen && modalType === 'prompt') {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [isOpen, modalType]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        cancelModal();
      }

      if (event.key === 'Enter') {
        confirmModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, cancelModal, confirmModal]);

  if (!isOpen) return null;

  const confirmButtonColor =
    colorType === 'danger'
      ? 'bg-[#ef4444] hover:bg-[#dc2626]'
      : 'bg-[#00BBA7] hover:bg-[#009e8d]';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        type="button"
        aria-label="모달 닫기"
        onClick={cancelModal}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      <div className="relative mx-4 flex w-full max-w-[360px] flex-col gap-5 rounded-2xl bg-white p-6 shadow-xl">
        <div>
          <h3 className="text-lg font-black text-slate-900">{title}</h3>
          <p className="mt-1 whitespace-pre-line text-sm text-slate-400">
            {desc}
          </p>
        </div>

        {modalType === 'prompt' && (
          <div className="relative">
            <input
              ref={inputRef}
              type={inputType === 'password' && showPasswordVisible ? 'text' : inputType}
              maxLength={20}
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              className={`w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100 ${inputType === 'password' ? 'pr-11' : ''}`}
            />
            {inputType === 'password' && (
              <button
                type="button"
                aria-label="비밀번호 표시"
                onClick={() => setShowPasswordVisible((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aac8c3] hover:text-[#00BBA7] transition-colors cursor-pointer bg-transparent border-0 p-0 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                  <line
                    x1="4"
                    y1="4"
                    x2="20"
                    y2="20"
                    strokeDasharray="24"
                    strokeDashoffset={showPasswordVisible ? 0 : 24}
                    className="[transition:stroke-dashoffset_0.2s]"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        <div className="flex gap-3">
          {modalType !== 'alert' && (
            <button
              type="button"
              onClick={cancelModal}
              className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              취소
            </button>
          )}

          <button
            type="button"
            onClick={confirmModal}
            className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition ${confirmButtonColor}`}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;