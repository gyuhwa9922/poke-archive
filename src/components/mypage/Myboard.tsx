const Myboard = () => {
  return (
    <div className="overflow-hidden rounded-xl border border-[#00bba7]/20 bg-white w-full">
      {/* 테이블 헤더 */}
      <div className="grid grid-cols-[96px_minmax(0,1fr)_120px_80px_80px_80px] items-center gap-4 border-b border-[#00bba7]/15 bg-[#f4faf9] px-6 py-4 text-sm font-semibold text-[#4a7a72]">
        <span>카테고리</span>
        <span>제목</span>
        <span>작성일</span>
        <span className="text-center">조회</span>
        <span className="text-center">좋아요</span>
        <span className="text-center">댓글</span>
      </div>

      {/* 게시글 행 */}
      <button
        type="button"
        className="grid w-full grid-cols-[96px_minmax(0,1fr)_120px_80px_80px_80px] items-center gap-4 border-b border-[#00bba7]/10 px-6 py-4 text-left transition-colors hover:bg-[#f8fcfb] last:border-b-0"
      >
        <span className="inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium text-[#00bba7] bg-[#e6f7f5]">
          자유게시판
        </span>
        <span className="flex items-center gap-2 min-w-0">
          <span className="truncate text-sm font-medium text-[#1a3a35]">
            게시글 제목 예시입니다
          </span>
          <span className="shrink-0 rounded-full px-2 py-0.5 text-xs font-medium text-gray-500 bg-gray-100">
            임시저장
          </span>
        </span>
        <span className="text-sm text-[#7a9b95]">2025.01.01</span>
        <span className="text-center text-sm text-[#7a9b95]">123</span>
        <span className="text-center text-sm text-[#7a9b95]">45</span>
        <span className="text-center text-sm text-[#7a9b95]">6</span>
      </button>
    </div>
  );
};

export default Myboard;
