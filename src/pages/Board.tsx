import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPosts } from '../api/post';
import { categoryColors, categoryMap, formatDate } from '../utils/boardConstants';
import CategoryFilter from '../components/board/CategoryFilter';
import BoardSearch from '../components/board/BoardSearch';

export interface BoardPost {
  postId: number;
  title: string;
  nickname: string;
  createdAt: string;
  viewCount: number;
  favoriteCount: number;
  commentCount: number;
  category: string;
  content?: string;
}

const Board = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<BoardPost[]>([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState('전체');

  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('title');

  const [page, setPage] = useState(1);

  const PAGE_SIZE = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPosts();

        const sorted = [...data].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setPosts(sorted as BoardPost[]);
      } catch (error) {
        console.error('게시글 불러오기 실패', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPosts = posts.filter((post) => {
    if (category !== '전체') {
      const categoryLabel = categoryMap[post.category as keyof typeof categoryMap] ?? post.category;

      if (categoryLabel !== category) return false;
    }

    const keyword = searchQuery.trim().toLowerCase();

    if (!keyword) return true;

    if (filterType === 'nickname') {
      return post.nickname.toLowerCase().includes(keyword);
    }

    if (filterType === 'content') {
      return (post.content ?? '').toLowerCase().includes(keyword);
    }

    return post.title.toLowerCase().includes(keyword);
  });

  const currentPosts = filteredPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const totalPages = Math.ceil(filteredPosts.length / PAGE_SIZE) || 1;

  const startPage = Math.max(1, page - 1);
  const endPage = Math.min(totalPages, page + 1);

  const handleSearch = () => {
    setSearchQuery(query);
    setPage(1);
  };

  return (
    <div className="flex w-full justify-center bg-[#dff5eb]">
      <div className="w-full max-w-[1440px] px-12 py-12 max-[768px]:px-6 max-[480px]:px-4">
        {/* 게시판 제목 영역 */}
        <div className="flex flex-col text-left">
          <h1 className="text-4xl font-bold text-[#1a3a35] max-[480px]:text-3xl">게시판</h1>
          <p className="mt-2 text-sm text-[#5a8a82]">
            트레이너들과 함께 정보를 공유하고 소통하세요
          </p>
        </div>

        <section className="mt-8 flex w-full items-start gap-6 max-[1025px]:flex-col max-[1025px]:items-stretch">
          {/* 왼쪽 카테고리 영역 */}
          <CategoryFilter
            selected={category}
            onSelect={(cat) => {
              setCategory(cat);
              setPage(1);
            }}
            onWrite={() => navigate('/write-post')}
          />

          {/* 오른쪽 검색 + 게시글 목록 + 페이지네이션 영역 */}
          <div className="flex min-w-0 flex-1 flex-col gap-5">
            {/* 검색 영역 */}
            <BoardSearch
              query={query}
              filterType={filterType}
              onQueryChange={setQuery}
              onFilterChange={setFilterType}
              onSearch={handleSearch}
            />

            {/* 게시글 카드 목록 영역 */}
            <div className="flex flex-col gap-4">
              {loading && (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white py-20 text-gray-400 shadow-sm">
                  <p className="text-lg font-medium">불러오는 중...</p>
                </div>
              )}

              {!loading && filteredPosts.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white py-20 text-gray-400 shadow-sm">
                  <p className="text-lg font-medium">등록된 게시글이 없습니다.</p>
                </div>
              )}

              {!loading &&
                currentPosts.map((post) => {
                  const categoryLabel =
                    categoryMap[post.category as keyof typeof categoryMap] ?? post.category;

                  const colors = categoryColors[categoryLabel] ?? categoryColors['전체'];

                  return (
                    <button
                      key={post.postId}
                      type="button"
                      onClick={() => navigate(`/board/${post.postId}`)}
                      className="flex min-h-[181px] w-full shrink-0 cursor-pointer flex-col items-start gap-3 self-stretch rounded-2xl border border-[#00bba7]/15 bg-white p-6 text-left shadow-sm transition-all hover:shadow-md"
                    >
                      <span
                        className={`flex h-6 min-w-20 items-center justify-center rounded-md px-3 text-xs font-medium ${colors.text} ${colors.bg}`}
                      >
                        {categoryLabel}
                      </span>

                      <p className="text-[18px] font-normal leading-7 text-[#101828]">
                        {post.title}
                      </p>

                      <div className="flex items-center gap-3 text-sm font-normal leading-5 text-[#6A7282]">
                        <span>{post.nickname}</span>
                        <span>{formatDate(post.createdAt)}</span>
                      </div>

                      <div className="mt-3 flex w-full items-center gap-4 border-t border-[#F3F4F6] pt-3 text-xs text-[#6a7282]">
                        <span className="flex items-center gap-1">
                          <svg
                            className="h-3.5 w-3.5"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              d="M1.37468 8.232C1.31912 8.08232 1.31912 7.91767 1.37468 7.768C1.91581 6.4559 2.83435 5.33402 4.01386 4.5446C5.19336 3.75517 6.58071 3.33374 8.00001 3.33374C9.41932 3.33374 10.8067 3.75517 11.9862 4.5446C13.1657 5.33402 14.0842 6.4559 14.6253 7.768C14.6809 7.91767 14.6809 8.08232 14.6253 8.232C14.0842 9.54409 13.1657 10.666 11.9862 11.4554C10.8067 12.2448 9.41932 12.6663 8.00001 12.6663C6.58071 12.6663 5.19336 12.2448 4.01386 11.4554C2.83435 10.666 1.91581 9.54409 1.37468 8.232Z"
                              strokeWidth="1.33333"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <circle
                              cx="8"
                              cy="8"
                              r="2"
                              strokeWidth="1.33333"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {post.viewCount}
                        </span>

                        <span className="flex items-center gap-1">
                          <svg
                            className="h-3.5 w-3.5"
                            viewBox="0 0 15 14"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              d="M12.0001 8.00008C12.9934 7.02675 14.0001 5.86008 14.0001 4.33341C14.0001 3.36095 13.6138 2.42832 12.9261 1.74069C12.2385 1.05306 11.3059 0.666748 10.3334 0.666748C9.16008 0.666748 8.33341 1.00008 7.33341 2.00008C6.33341 1.00008 5.50675 0.666748 4.33341 0.666748C3.36095 0.666748 2.42832 1.05306 1.74069 1.74069C1.05306 2.42832 0.666748 3.36095 0.666748 4.33341C0.666748 5.86675 1.66675 7.03341 2.66675 8.00008L7.33341 12.6667L12.0001 8.00008Z"
                              strokeWidth="1.33333"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {post.favoriteCount}
                        </span>

                        <span className="flex items-center gap-1">
                          <svg
                            className="h-3.5 w-3.5"
                            viewBox="0 0 14 14"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              d="M4.60008 12.0053C5.87247 12.658 7.33614 12.8348 8.72734 12.5038C10.1185 12.1729 11.3458 11.3559 12.1879 10.2001C13.0301 9.04434 13.4317 7.62579 13.3205 6.2001C13.2092 4.7744 12.5925 3.4353 11.5813 2.42412C10.5701 1.41293 9.23101 0.796155 7.80531 0.684932C6.37961 0.573708 4.96106 0.975352 3.80529 1.81749C2.64953 2.65962 1.83254 3.88686 1.50156 5.27806C1.17058 6.66926 1.34738 8.13294 2.00008 9.40532L0.666748 13.3387L4.60008 12.0053Z"
                              strokeWidth="1.33333"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {post.commentCount}
                        </span>
                      </div>
                    </button>
                  );
                })}
            </div>

            {/* ================= 페이지네이션 시작 ================= */}
            {!loading && filteredPosts.length > 0 && (
              <div className="mt-2 flex items-center justify-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setPage((prev) => Math.max(1, prev - 1));
                    window.scrollTo(0, 0);
                  }}
                  disabled={page === 1}
                  className={`rounded-lg border px-4 py-2 text-sm transition-all ${
                    page === 1
                      ? 'cursor-not-allowed border-gray-200 text-gray-300'
                      : 'border-[#00bba7]/30 text-[#4a7a72] hover:bg-[#e6f7f5]'
                  }`}
                >
                  이전
                </button>

                {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
                  const pageNum = startPage + i;

                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => {
                        setPage(pageNum);
                        window.scrollTo(0, 0);
                      }}
                      className={`h-10 w-10 rounded-lg text-sm transition-all ${
                        page === pageNum
                          ? 'bg-[#05B29F] font-medium text-white'
                          : 'border border-[#00bba7]/30 text-[#4a7a72] hover:bg-[#e6f7f5]'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => {
                    setPage((prev) => Math.min(totalPages, prev + 1));
                    window.scrollTo(0, 0);
                  }}
                  disabled={page === totalPages}
                  className={`rounded-lg border px-4 py-2 text-sm transition-all ${
                    page === totalPages
                      ? 'cursor-not-allowed border-gray-200 text-gray-300'
                      : 'border-[#00bba7]/30 text-[#4a7a72] hover:bg-[#e6f7f5]'
                  }`}
                >
                  다음
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Board;
