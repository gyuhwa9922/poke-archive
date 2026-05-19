import { useState } from 'react';
import type { User } from '../../api/user';
import { checkNickname, updateMe } from '../../api/user';
import { useAuthStore } from '../../store/authStore';

interface MyinfoProps {
  user: User;
  postCount: number;
  catchCount: number;
  onUpdate?: () => void;
}

const Myinfo = ({ user, postCount, catchCount, onUpdate }: MyinfoProps) => {
  const { checkAuth } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [nicknameValue, setNicknameValue] = useState('');
  const [introduceValue, setIntroduceValue] = useState('');
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [nicknameMsg, setNicknameMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const handleEdit = () => {
    setNicknameValue(user.nickname ?? '');
    setIntroduceValue(user.introduce ?? '');
    setIsEditing(true);
    setNicknameChecked(false);
    setNicknameMsg(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNicknameChecked(false);
    setNicknameMsg(null);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNicknameValue(e.target.value);
    setNicknameChecked(false);
    setNicknameMsg(null);
  };

  const handleCheckNickname = async () => {
    const trimmed = nicknameValue.trim();
    if (!trimmed) {
      setNicknameMsg({ text: '닉네임을 입력해주세요.', ok: false });
      return;
    }
    try {
      const result = await checkNickname(trimmed);
      if (result.exists) {
        setNicknameChecked(false);
        setNicknameMsg({ text: '이미 사용 중인 닉네임입니다.', ok: false });
      } else {
        setNicknameChecked(true);
        setNicknameMsg({ text: '사용 가능한 닉네임입니다.', ok: true });
      }
    } catch {
      setNicknameMsg({ text: '중복 확인 중 오류가 발생했습니다.', ok: false });
    }
  };

  const handleSave = async () => {
    const nicknameChanged = nicknameValue.trim() !== (user.nickname ?? '');
    if (nicknameChanged && !nicknameChecked) {
      setNicknameMsg({ text: '닉네임 중복확인을 해주세요.', ok: false });
      return;
    }
    try {
      await updateMe(nicknameValue.trim(), introduceValue);
      setIsEditing(false);
      setNicknameChecked(false);
      setNicknameMsg(null);
      await checkAuth();
      onUpdate?.();
    } catch {
      setNicknameMsg({ text: '저장 중 오류가 발생했습니다.', ok: false });
    }
  };

  return (
    <div className="flex flex-col gap-4 flex-1">
      {/* 플레이어 카드 */}
      <div className="flex flex-col items-center gap-4 px-4 py-6 bg-white rounded-[14px] shadow-sm">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
          alt="플레이어 아이콘"
          className="w-20 h-20 object-contain"
        />
        <h2 className="text-base font-semibold text-[#1a3a35]">{user.nickname ?? ''}</h2>
        <div className="flex gap-4 w-full justify-center pb-6">
          <div className="flex flex-1 max-w-67 flex-col items-center gap-1 p-4 rounded-[10px] bg-[#F9FAFB]">
            <p className="text-sm text-[#6a7282]">게시글</p>
            <span className="text-2xl font-semibold text-[#00bba7]">{postCount}</span>
          </div>
          <div className="flex flex-1 max-w-67 flex-col items-center gap-1 p-4 rounded-[10px] bg-[#F9FAFB]">
            <p className="text-sm text-[#6a7282]">포획</p>
            <span className="text-2xl font-semibold text-[#ee8130]">{catchCount}</span>
          </div>
        </div>
      </div>

      {/* 내 정보 관리 */}
      <div className="flex flex-col gap-6 p-6 bg-white rounded-2xl shadow-sm mb-10">
        <p className="text-lg font-semibold text-[#1a3a35]">내 정보</p>

        <div className="flex flex-col gap-4 w-full">
          {/* 닉네임 - 중복확인 필요 */}
          <div className="flex flex-col gap-1.5">
            <p className="text-sm font-medium text-[#4a7a72]">닉네임</p>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={isEditing ? nicknameValue : (user.nickname ?? '')}
                onChange={handleNicknameChange}
                disabled={!isEditing}
                className="flex-1 px-3.5 py-2.5 rounded-lg border border-[#e6f7f5] bg-[#F9FAFB] text-[#1a3a35] text-sm outline-none disabled:cursor-default focus:border-[#00bba7] focus:bg-white transition-colors"
              />
              {isEditing && (
                <button
                  type="button"
                  onClick={handleCheckNickname}
                  className="shrink-0 px-4 py-2.5 rounded-lg border border-[#00bba7] text-[#00bba7] text-sm font-medium hover:bg-[#e6f7f5] transition-colors cursor-pointer"
                >
                  중복확인
                </button>
              )}
            </div>
            {isEditing && nicknameMsg && (
              <p className={`text-xs ${nicknameMsg.ok ? 'text-[#00bba7]' : 'text-red-500'}`}>
                {nicknameMsg.text}
              </p>
            )}
          </div>

          {/* 아이디 - 수정 불가 */}
          <div className="flex flex-col gap-1.5">
            <p className="text-sm font-medium text-[#4a7a72]">아이디</p>
            <input
              type="text"
              value={user.loginId ?? ''}
              disabled
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#e6f7f5] bg-[#F9FAFB] text-[#1a3a35] text-sm outline-none cursor-default"
            />
          </div>

          {/* 자기소개 - 중복확인 없이 수정 가능 */}
          <div className="flex flex-col gap-1.5">
            <p className="text-sm font-medium text-[#4a7a72]">자기소개</p>
            <textarea
              value={isEditing ? introduceValue : (user.introduce ?? '')}
              onChange={(e) => setIntroduceValue(e.target.value)}
              disabled={!isEditing}
              rows={3}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#e6f7f5] bg-[#F9FAFB] text-[#1a3a35] text-sm outline-none resize-none disabled:cursor-default focus:border-[#00bba7] focus:bg-white transition-colors"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 w-full">
          {isEditing && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2.5 rounded-lg border border-[#00bba7] text-[#00bba7] text-sm font-semibold cursor-pointer hover:bg-[#e6f7f5] transition-colors"
            >
              취소
            </button>
          )}
          <button
            type="button"
            onClick={isEditing ? handleSave : handleEdit}
            className="px-6 py-2.5 rounded-lg bg-[#00bba7] text-white text-sm font-semibold border-none cursor-pointer hover:bg-[#009e8c] transition-colors"
          >
            {isEditing ? '저장하기' : '수정하기'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Myinfo;
