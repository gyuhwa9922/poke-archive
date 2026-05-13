import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createComment,
  deleteComment,
  deletePost,
  getPostComments,
  getPostDetail,
  togglePostLike,
  updateComment,
  type Comment,
  type PostDetail,
} from '../api/post';
import { categoryColors, categoryMap, formatDate } from '../utils/boardConstants';
import { showConfirm, showModal } from '../store/modalStore';

const SLOT_POSITIONS = [
  { top: '35%', left: '4%' },
  { top: '35%', left: '25%' },
  { top: '35%', left: '46%' },
  { top: '54%', left: '4%' },
  { top: '54%', left: '25%' },
  { top: '54%', left: '46%' },
];

type SpriteMap = Record<number, string>;

function getCurrentUserId() {
  const savedUserId = localStorage.getItem('userId');

  if (savedUserId && savedUserId !== 'undefined') {
    return String(savedUserId);
  }

  const token = localStorage.getItem('token');

  if (!token || token === 'undefined') {
    return '';
  }

  try {
    const payloadPart = token.split('.')[1];
    const base64 = payloadPart.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));

    return String(payload.userId ?? payload.id ?? payload.sub ?? '');
  } catch (error) {
    console.error(error);
    return '';
  }
}

async function fetchSprites(ids: number[]): Promise<SpriteMap> {
  if (!ids || ids.length === 0) return {};

  const resultMap: SpriteMap = {};

  //post.preset.pocketmons에 들어있는 포켓몬 ID 배열을 받아서, 포켓몬 이미지
  const results = await Promise.allSettled(
    ids.map(async (id) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();

      return {
        id,
        url:
          data.sprites?.other?.['official-artwork']?.front_default ||
          data.sprites?.front_default ||
          '',
      };
    })
  );

  results.forEach((result) => {
    if (result.status === 'fulfilled') {
      resultMap[result.value.id] = result.value.url;
    }
  });

  return resultMap;
}

const DetailPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [post, setPost] = useState<PostDetail | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [spriteMap, setSpriteMap] = useState<SpriteMap>({});
  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [isLiked, setIsLiked] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');

  const currentUserId = getCurrentUserId();

  const loadDetail = useCallback(async () => {
    if (!id) {
      navigate('/board');
      return;
    }

    try {
      setIsLoading(true);

      const [postData, commentData] = await Promise.all([getPostDetail(id), getPostComments(id)]);

      setPost(postData);
      setComments(commentData);
      setIsLiked(postData.isFavorited === true);
      setFavoriteCount(postData.favoriteCount ?? 0);

      if (postData.preset?.pocketmons?.length) {
        const sprites = await fetchSprites(postData.preset.pocketmons);
        setSpriteMap(sprites);
      } else {
        setSpriteMap({});
      }
    } catch (error) {
      console.error(error);
      await showModal('오류', '게시글을 불러오지 못했습니다.', 'danger');
      navigate('/board');
    } finally {
      setIsLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    loadDetail();
  }, [loadDetail]);

  const handleLike = async () => {
    if (!id) return;

    const token = localStorage.getItem('token');

    if (!token || token === 'undefined') {
      await showModal('비로그인 상태', '로그인이 필요한 서비스입니다.', 'danger');
      navigate('/login');
      return;
    }

    try {
      const ok = await togglePostLike(id);

      if (!ok) {
        await showModal('오류', '좋아요 처리에 실패했습니다.', 'danger');
        return;
      }

      setIsLiked((prev) => !prev);
      setFavoriteCount((prev) => {
        if (isLiked) return Math.max(0, prev - 1);
        return prev + 1;
      });
    } catch (error) {
      console.error(error);
      await showModal('오류', '좋아요 처리 중 오류가 발생했습니다.', 'danger');
    }
  };

  const handleSubmitComment = async () => {
    if (!id) return;

    const token = localStorage.getItem('token');

    if (!token || token === 'undefined') {
      await showModal('비로그인 상태', '로그인이 필요한 서비스입니다.', 'danger');
      navigate('/login');
      return;
    }

    if (!commentText.trim()) {
      await showModal('댓글 미입력', '댓글 내용을 입력해주세요.', 'danger');
      return;
    }

    try {
      await createComment(id, commentText.trim());
      setCommentText('');
      await loadDetail();
    } catch (error) {
      console.error(error);
      await showModal('오류', '댓글 작성 중 오류가 발생했습니다.', 'danger');
    }
  };

  const handleStartEditComment = (comment: Comment) => {
    setEditingCommentId(comment.commentId);
    setEditingContent(comment.content);
  };

  const handleCancelEditComment = () => {
    setEditingCommentId(null);
    setEditingContent('');
  };

  const handleSaveEditComment = async (commentId: number, oldContent: string) => {
    if (!editingContent.trim()) {
      await showModal('댓글 미입력', '댓글 내용을 입력해주세요.', 'danger');
      return;
    }

    if (editingContent.trim() === oldContent) {
      handleCancelEditComment();
      return;
    }

    try {
      await updateComment(commentId, editingContent.trim());
      handleCancelEditComment();
      await loadDetail();
    } catch (error) {
      console.error(error);
      await showModal('오류', '댓글 수정 중 오류가 발생했습니다.', 'danger');
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    const ok = await showConfirm('댓글 삭제', '정말 이 댓글을 삭제하시겠습니까?');

    if (!ok) return;

    try {
      await deleteComment(commentId);
      await loadDetail();
    } catch (error) {
      console.error(error);
      await showModal('오류', '댓글 삭제 중 오류가 발생했습니다.', 'danger');
    }
  };

  const handleEditPost = () => {
    if (!post) return;
    navigate(`/write-post/${post.postId}`);
  };

  const handleDeletePost = async () => {
    if (!post) return;

    const ok = await showConfirm('게시글 삭제', '정말 이 게시글을 삭제하시겠습니까?');

    if (!ok) return;

    try {
      await deletePost(post.postId);
      await showModal('성공', '게시글이 삭제되었습니다.');
      navigate('/board');
    } catch (error) {
      console.error(error);
      await showModal('오류', '게시글 삭제 중 오류가 발생했습니다.', 'danger');
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#f4faf9] px-4 py-10">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-10 text-center text-gray-400 shadow">
          게시글을 불러오는 중입니다...
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-[#f4faf9] px-4 py-10">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-10 text-center shadow">
          <p className="text-lg font-bold text-gray-400">게시글을 불러오지 못했어요.</p>
          <button
            type="button"
            onClick={() => navigate('/board')}
            className="mt-4 rounded-lg bg-[#05B29F] px-4 py-2 text-white"
          >
            게시판으로 돌아가기
          </button>
        </div>
      </main>
    );
  }

  const screenCategory = categoryMap[post.category as keyof typeof categoryMap] ?? post.category;

  const badgeColor = categoryColors[screenCategory] ?? {
    text: 'text-gray-500',
    bg: 'bg-gray-100',
    border: 'border-gray-200',
  };

  const isMyPost = String(post.userId) === String(currentUserId);

  return (
    <main className="min-h-screen bg-[#f4faf9] px-4 py-10">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <section className="flex w-full flex-col items-start gap-8 rounded-2xl bg-white p-8 shadow">
          <button
            type="button"
            onClick={() => navigate('/board')}
            className="group flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2 text-sm font-bold text-gray-500 transition-all hover:bg-[#05B29F]/10 hover:text-[#05B29F]"
          >
            <span className="transform transition-transform group-hover:-translate-x-1">←</span>
            목록으로 돌아가기
          </button>

          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-col items-start gap-2">
              <span
                className={`inline-block rounded-md border px-3 py-1 text-[11px] font-bold ${badgeColor.text} ${badgeColor.bg} ${badgeColor.border}`}
              >
                {screenCategory}
              </span>

              <div className="flex w-full items-start justify-between gap-4">
                <h1 className="flex-1 text-3xl font-bold leading-tight text-[#1a3a35]">
                  {post.title}
                </h1>

                {isMyPost && (
                  <div className="flex shrink-0 items-center gap-3">
                    <button
                      type="button"
                      onClick={handleEditPost}
                      className="text-sm font-bold text-gray-400 transition-colors hover:text-[#05B29F]"
                    >
                      수정
                    </button>
                    <button
                      type="button"
                      onClick={handleDeletePost}
                      className="text-sm font-bold text-gray-400 transition-colors hover:text-red-500"
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex w-full flex-col items-start justify-between gap-2 text-sm text-gray-400 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <span className="text-[16px] font-bold text-gray-700">{post.nickname}</span>
                <span className="text-gray-200">|</span>
                <span className="font-medium">
                  {post.createdAt ? formatDate(post.createdAt) : ''}
                </span>
              </div>

              <div className="font-medium">
                조회수{' '}
                <span className="ml-1 font-bold text-gray-600">
                  {post.viewCount?.toLocaleString() ?? 0}
                </span>
              </div>
            </div>
          </div>

          <div className="block min-h-[400px] w-full px-0 py-10 md:px-10">
            <div className="mb-14 whitespace-pre-wrap text-left text-[16px] leading-relaxed text-gray-700 md:text-[17px]">
              {post.content?.trim()}
            </div>

            {post.imgUrl && (
              <div className="mb-14 w-full overflow-hidden rounded-3xl border border-gray-100 md:rounded-[32px]">
                <img src={post.imgUrl} alt="게시글 이미지" className="block h-auto w-full" />
              </div>
            )}
          </div>

          {post.preset && (
            <div className="mx-auto w-full max-w-[600px]">
              {post.preset.deckname && (
                <p className="mb-2 text-center text-[13px] font-bold text-gray-500">
                  {post.preset.deckname}
                </p>
              )}
              {/* 트레이너 카드 이미지 */}
              <div className="relative w-full overflow-hidden rounded-xl">
                <img
                  src={
                    post.preset.gender === 'woman'
                      ? '/assets/trianercard_woman.png'
                      : '/assets/trianercard_man.png'
                  }
                  alt="trainer-card"
                  className="block h-auto w-full select-none"
                />

                {SLOT_POSITIONS.map((position, index) => {
                  const pokemonId = post.preset?.pocketmons?.[index];
                  const spriteUrl = pokemonId ? spriteMap[pokemonId] : '';

                  return (
                    <div
                      key={`${pokemonId ?? 'empty'}-${index}`}
                      className="absolute h-[17%] w-[20%]"
                      style={{
                        top: position.top,
                        left: position.left,
                      }}
                    >
                      {spriteUrl && (
                        <img
                          src={spriteUrl}
                          alt={`pokemon-${pokemonId}`}
                          className="h-full w-full object-contain p-1"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleLike}
            className="flex h-[60px] w-full flex-1 items-center justify-center gap-3 rounded-lg border border-[#D1D5DC] bg-white transition-all hover:bg-gray-50 active:scale-[0.98]"
          >
            <span className="text-2xl leading-none">{isLiked ? '❤️' : '🤍'}</span>
            <span className="text-[18px] font-black text-[#1a3a35]">{favoriteCount}</span>
          </button>
        </section>

        <section className="rounded-2xl bg-white px-6 py-8 shadow md:px-10">
          <h3 className="mb-8 text-lg font-black text-gray-900 md:text-xl">
            댓글 <span className="ml-1 font-medium text-gray-400">{comments.length}</span>
          </h3>

          <div className="mb-10 flex flex-col gap-2">
            {comments.length > 0 ? (
              comments.map((comment) => {
                const isMyComment = String(comment.userId) === String(currentUserId);
                const isEditing = editingCommentId === comment.commentId;

                return (
                  <div
                    key={comment.commentId}
                    className="rounded-2xl border border-gray-100 bg-[#F8F9FA] px-6 py-5"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[15px] font-bold text-gray-800">
                          {comment.nickname}
                        </span>
                        <span className="text-xs font-medium text-gray-400">
                          {comment.createdAt ? formatDate(comment.createdAt) : ''}
                        </span>

                        {isMyComment && (
                          <>
                            <span className="text-[10px] text-gray-300">|</span>
                            <div className="flex gap-2">
                              {isEditing ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleSaveEditComment(comment.commentId, comment.content)
                                    }
                                    className="text-[11px] font-bold text-[#05B29F]"
                                  >
                                    저장
                                  </button>
                                  <button
                                    type="button"
                                    onClick={handleCancelEditComment}
                                    className="text-[11px] font-bold text-gray-400"
                                  >
                                    취소
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => handleStartEditComment(comment)}
                                    className="text-[11px] font-bold text-gray-400 transition-colors hover:text-[#05B29F]"
                                  >
                                    수정
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteComment(comment.commentId)}
                                    className="text-[11px] font-bold text-gray-400 transition-colors hover:text-red-500"
                                  >
                                    삭제
                                  </button>
                                </>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {isEditing ? (
                      <textarea
                        value={editingContent}
                        onChange={(event) => setEditingContent(event.target.value)}
                        rows={3}
                        className="mt-2 w-full resize-none rounded-lg border border-gray-200 p-3 text-[14px] text-gray-600 outline-none focus:border-[#05B29F]"
                      />
                    ) : (
                      <p className="whitespace-pre-wrap text-left text-[14px] leading-relaxed text-gray-600">
                        {comment.content}
                      </p>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="py-10 text-center text-gray-400">아직 댓글이 없습니다.</p>
            )}
          </div>

          <div className="mb-2 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <textarea
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
              placeholder="댓글을 입력하세요..."
              className="block h-32 w-full resize-none border-none p-5 text-gray-700 outline-none placeholder:text-gray-300"
            />
          </div>

          <button
            type="button"
            onClick={handleSubmitComment}
            className="w-full rounded-xl bg-[#05B29F] py-4 text-base font-bold text-white shadow-sm shadow-emerald-100 transition-all hover:bg-[#049686] active:scale-95 md:text-lg"
          >
            댓글 작성
          </button>
        </section>
      </div>
    </main>
  );
};

export default DetailPost;
