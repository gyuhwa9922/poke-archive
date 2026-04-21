interface User {
  nickname: string;
  loginId: string;
  introduce: string;
}

interface MyinfoProps {
  user: User;
  postCount: number;
  catchCount: number;
}

const Myinfo = ({ user, postCount, catchCount }: MyinfoProps) => {
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
          {/* 닉네임 */}
          <div className="flex flex-col gap-1.5">
            <p className="text-sm font-medium text-[#4a7a72]">닉네임</p>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                defaultValue={user.nickname ?? ''}
                disabled
                className="flex-1 px-3.5 py-2.5 rounded-lg border border-[#e6f7f5] bg-[#F9FAFB] text-[#1a3a35] text-sm outline-none disabled:cursor-default"
              />
            </div>
          </div>

          {/* 아이디 */}
          <div className="flex flex-col gap-1.5">
            <p className="text-sm font-medium text-[#4a7a72]">아이디</p>
            <input
              type="text"
              defaultValue={user.loginId ?? ''}
              disabled
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#e6f7f5] bg-[#F9FAFB] text-[#1a3a35] text-sm outline-none cursor-default"
            />
          </div>

          {/* 자기소개 */}
          <div className="flex flex-col gap-1.5">
            <p className="text-sm font-medium text-[#4a7a72]">자기소개</p>
            <textarea
              defaultValue={user.introduce ?? ''}
              disabled
              rows={3}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#e6f7f5] bg-[#F9FAFB] text-[#1a3a35] text-sm outline-none resize-none disabled:cursor-default"
            />
          </div>
        </div>

        <div className="flex justify-end w-full">
          <button className="px-6 py-2.5 rounded-lg bg-[#00bba7] text-white text-sm font-semibold border-none cursor-pointer hover:bg-[#009e8c] transition-colors">
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Myinfo;
