import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPosts } from '../api/post';
import { categoryMap, categoryColors } from '../utils/boardConstants';
import CategoryFilter from '../components/board/CategoryFilter';

export interface Post {
  postId: number;
  title: string;
  nickname: string;
  createdAt: string;
  viewCount: number;
  favoriteCount: number;
  commentCount: number;
  category: string;
}

const Board = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState('전체');

  //  페이지네이션 상태
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 8;

  //  게시글 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPosts();

        const sorted = data.sort(
          (a: Post, b: Post) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setPosts(sorted);
      } catch (e) {
        console.error('게시글 불러오기 실패', e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 카테고리 필터링
  const filteredPosts = posts.filter((post) => {
    if (category === '전체') return true;

    const categoryLabel = categoryMap[post.category as keyof typeof categoryMap] ?? post.category;

    return categoryLabel === category;
  });

  //  현재 페이지 데이터
  const currentPosts = filteredPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  //  총 페이지 수
  const totalPages = Math.ceil(filteredPosts.length / PAGE_SIZE);

  //  페이지 범위 (JS 코드 그대로)
  const startPage = Math.max(1, page - 1);
  const endPage = Math.min(totalPages, page + 1);

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-360 m-12 gap-3">
        {/* 제목 */}
        <div className="flex flex-col text-left">
          <h1 className="text-3xl font-bold text-[#1a3a35]">게시판</h1>
          <p className="text-sm text-[#5a8a82] mt-1">
            트레이너들과 함께 정보를 공유하고 소통하세요
          </p>
        </div>

        <section className="flex gap-6 w-full items-start mt-6">
          {/*  왼쪽 사이드바 */}
          <aside
            className="flex flex-col gap-2 w-56 shrink-0

    bg-white rounded-2xl shadow-sm border border-gray-100 p-5

    max-[1025px]:w-full
    max-[1025px]:flex-row
    max-[1025px]:overflow-x-auto
  "
          >
            <CategoryFilter
              selected={category}
              onSelect={(cat) => {
                setCategory(cat);
                setPage(1);
              }}
              onWrite={() => navigate('/write-post')}
            />{' '}
          </aside>
          <div className="flex flex-col gap-4 flex-1 min-w-0">
            {/* 게시글 목록 */}
            <div className="overflow-hidden rounded-xl border border-[#00bba7]/20 bg-white">
              {/* 헤더 */}
              <div className="grid grid-cols-[96px_minmax(0,1fr)_120px_96px_80px] items-center gap-4 border-b border-[#00bba7]/15 bg-[#f4faf9] px-6 py-4 text-sm font-semibold text-[#4a7a72] max-[900px]:hidden">
                <span>카테고리</span>
                <span>제목</span>
                <span>작성자</span>
                <span>작성일</span>
                <span className="text-right">조회</span>
              </div>

              {/* 로딩 */}
              {loading && <div className="p-10 text-center text-gray-400">불러오는 중...</div>}

              {/* 데이터 없음 */}
              {!loading && filteredPosts.length === 0 && (
                <div className="p-10 text-center text-gray-400">게시글이 없습니다.</div>
              )}

              {/*  게시글 리스트 */}
              {!loading &&
                currentPosts.map((post) => {
                  const categoryLabel =
                    categoryMap[post.category as keyof typeof categoryMap] || post.category;

                  const colors = categoryColors[categoryLabel] ?? categoryColors['전체'];

                  return (
                    <button
                      key={post.postId}
                      onClick={() => navigate(`/board/${post.postId}`)}
                      className="grid w-full grid-cols-[96px_minmax(0,1fr)_120px_96px_80px] items-center gap-4 border-b border-[#00bba7]/10 px-6 py-4 text-left transition-colors hover:bg-[#f8fcfb] last:border-b-0 max-[900px]:grid-cols-1 max-[900px]:gap-2"
                    >
                      {/* 카테고리 */}
                      <span
                        className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium ${colors.text} ${colors.bg}`}
                      >
                        {categoryLabel}
                      </span>

                      {/* 제목 */}
                      <span className="truncate text-sm font-medium text-[#1a3a35]">
                        {post.title}
                      </span>

                      {/* 작성자 */}
                      <span className="text-sm text-[#4a7a72]">{post.nickname}</span>

                      {/* 작성일 */}
                      <span className="text-sm text-[#7a9b95]">{post.createdAt?.slice(0, 10)}</span>

                      {/* 조회수 */}
                      <span className="text-right text-sm text-[#7a9b95]">{post.viewCount}</span>
                    </button>
                  );
                })}
            </div>

            {/*  페이지네이션 */}
            <div className="flex items-center gap-1.5 justify-center mt-4">
              {/* 이전 */}
              <button
                onClick={() => {
                  setPage((prev) => prev - 1);
                  window.scrollTo(0, 0);
                }}
                disabled={page === 1}
                className={`px-4 py-2 text-sm rounded-lg border transition-all ${
                  page === 1
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                    : 'border-[#00bba7]/30 text-[#4a7a72] hover:bg-[#e6f7f5]'
                }`}
              >
                이전
              </button>

              {/* 숫자 */}
              {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
                const pageNum = startPage + i;

                return (
                  <button
                    key={pageNum}
                    onClick={() => {
                      setPage(pageNum);
                      window.scrollTo(0, 0);
                    }}
                    className={`w-10 h-10 text-sm rounded-lg transition-all ${
                      page === pageNum
                        ? 'bg-[#05B29F] text-white font-medium'
                        : 'border border-[#00bba7]/30 text-[#4a7a72] hover:bg-[#e6f7f5]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* 다음 */}
              <button
                onClick={() => {
                  setPage((prev) => prev + 1);
                  window.scrollTo(0, 0);
                }}
                disabled={page === totalPages}
                className={`px-4 py-2 text-sm rounded-lg border transition-all ${
                  page === totalPages
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                    : 'border-[#00bba7]/30 text-[#4a7a72] hover:bg-[#e6f7f5]'
                }`}
              >
                다음
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Board;
