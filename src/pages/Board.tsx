const Board = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-360 m-12 gap-3">
        {/* 페이지 타이틀 */}
        <div className="flex flex-col text-left">
          <h1 className="text-3xl font-bold text-[#1a3a35]">게시판</h1>
          <p className="text-sm text-[#5a8a82] mt-1">
            트레이너들과 함께 정보를 공유하고 소통하세요
          </p>
        </div>

        <section className="flex gap-6 w-full items-start max-[1025px]:flex-col max-[1025px]:items-stretch mt-6">
          {/* 카테고리 필터 + 글쓰기 버튼 영역 */}
          {/* <CategoryFilter /> */}

          <div className="flex flex-col gap-4 flex-1 min-w-0">
            {/* 검색 영역 */}
            {/* <BoardSearch /> */}

            {/* 게시글 목록 테이블 */}
            <div className="overflow-hidden rounded-xl border border-[#00bba7]/20 bg-white">
              {/* 테이블 헤더 */}
              <div className="grid grid-cols-[96px_minmax(0,1fr)_120px_96px_80px] items-center gap-4 border-b border-[#00bba7]/15 bg-[#f4faf9] px-6 py-4 text-sm font-semibold text-[#4a7a72] max-[900px]:hidden">
                <span>카테고리</span>
                <span>제목</span>
                <span>작성자</span>
                <span>작성일</span>
                <span className="text-right">조회</span>
              </div>

              {/* 게시글 행 (map으로 반복) */}
              {/* posts.map((post) => ( */}
              <button
                type="button"
                className="grid w-full grid-cols-[96px_minmax(0,1fr)_120px_96px_80px] items-center gap-4 border-b border-[#00bba7]/10 px-6 py-4 text-left transition-colors hover:bg-[#f8fcfb] last:border-b-0 max-[900px]:grid-cols-1 max-[900px]:gap-2"
              >
                <span className="inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium text-[#00bba7] bg-[#e6f7f5]">
                  자유게시판
                </span>
                <span className="truncate text-sm font-medium text-[#1a3a35]">
                  게시글 제목 예시입니다
                </span>
                <span className="text-sm text-[#4a7a72]">닉네임</span>
                <span className="text-sm text-[#7a9b95]">2025.01.01</span>
                <span className="text-right text-sm text-[#7a9b95]">123</span>
              </button>
              {/* )) */}
            </div>

            {/* 페이지네이션 영역 */}
            <div className="grid items-center mt-2">
              <div className="flex items-center gap-1.5 justify-self-center" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Board;
