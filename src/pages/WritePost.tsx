import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createPost,
  getPartyPresets,
  getPostDetail,
  publishPost,
  updatePost,
  uploadPostImage,
  type PostPresetPayload,
} from '../api/post';
import { reverseCategoryMap, categoryMap } from '../utils/boardConstants';
import { usePostWriteStore } from '../store/postWriteStore';
import { showModal } from '../store/modalStore';

type ScreenCategory = keyof typeof reverseCategoryMap;

const CATEGORY_OPTIONS: ScreenCategory[] = ['자유게시판', '질문게시판', '공략', '파티공유'];

const WritePost = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    title,
    category,
    content,
    presetId,
    imgUrl,
    presets,
    isSubmitting,
    setTitle,
    setCategory,
    setContent,
    setPresetId,
    setImgUrl,
    setPresets,
    setIsSubmitting,
    resetForm,
  } = usePostWriteStore();

  const isEditMode = Boolean(id);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token || token === 'undefined') {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return;
    }

    const initPage = async () => {
      try {
        resetForm();

        const presetList = await getPartyPresets();
        setPresets(presetList);

        if (!id) return;

        const post = await getPostDetail(id);

        setTitle(post.title ?? '');
        setContent(post.content ?? '');

        const screenCategory =
          categoryMap[post.category as keyof typeof categoryMap] ?? post.category ?? '';

        setCategory(screenCategory);

        if (post.imgUrl) {
          setImgUrl(post.imgUrl);
        }

        if (post.preset) {
          setPresetId('default');
        }
      } catch (error) {
        console.error(error);
        await showModal('오류', '게시글 정보를 불러오는 중 오류가 발생했습니다.', 'danger');
        navigate('/board');
      }
    };

    initPage();
  }, [
    id,
    navigate,
    resetForm,
    setCategory,
    setContent,
    setImgUrl,
    setPresetId,
    setPresets,
    setTitle,
  ]);

  const getSelectedPresetPayload = (): PostPresetPayload | null => {
    if (!presetId) return null;

    const selectedPreset = presets.find((preset) => preset.partyId === Number(presetId));

    if (!selectedPreset) return null;

    return {
      deckname: selectedPreset.deckname,
      pocketmons: selectedPreset.pocketmons,
      gender: selectedPreset.gender,
    };
  };

  const validateForm = () => {
    if (!category) {
      showModal('오류', '카테고리를 선택해주세요.', 'danger');
      return false;
    }

    if (!title.trim()) {
      showModal('오류', '제목을 입력해주세요.', 'danger');
      return false;
    }

    if (!content.trim()) {
      showModal('오류', '내용을 입력해주세요.', 'danger');
      return false;
    }

    return true;
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      const imageUrl = await uploadPostImage(file);
      setImgUrl(imageUrl);
    } catch (error) {
      console.error(error);
      await showModal('오류', '이미지 업로드 중 오류가 발생했습니다.', 'danger');
    }
  };

  const handleSaveDraft = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const apiCategory = reverseCategoryMap[category as ScreenCategory];

      await createPost({
        title: title.trim(),
        category: apiCategory,
        content: content.trim(),
        preset: getSelectedPresetPayload(),
        imgUrl,
      });

      await showModal('성공', '임시 저장이 완료되었습니다.', 'default');
      resetForm();
      navigate('/board');
    } catch (error) {
      console.error(error);
      await showModal('오류', '임시 저장 중 오류가 발생했습니다.', 'danger');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const apiCategory = reverseCategoryMap[category as ScreenCategory];

      const createdPost = await createPost({
        title: title.trim(),
        category: apiCategory,
        content: content.trim(),
        preset: getSelectedPresetPayload(),
        imgUrl,
      });

      if (createdPost.postId) {
        await publishPost(createdPost.postId);
      }

      await showModal('성공', '게시글이 등록되었습니다.','default');
      resetForm();
      navigate('/board');
    } catch (error) {
      console.error(error);
      await showModal('오류', '게시글 작성 중 오류가 발생했습니다.', 'danger');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    if (!id) return;
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const apiCategory = reverseCategoryMap[category as ScreenCategory];

      await updatePost(id, {
        title: title.trim(),
        category: apiCategory,
        content: content.trim(),
        preset: getSelectedPresetPayload(),
        imgUrl,
      });

      await showModal('성공', '게시글이 수정되었습니다.', 'default');
      resetForm();
      navigate(`/board/${id}`);
    } catch (error) {
      console.error(error);
      await showModal('오류', '게시글 수정 중 오류가 발생했습니다.', 'danger');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen py-10 px-4 flex justify-center bg-[#f4faf9]">
      <div className="w-full max-w-4xl">
        <section className="flex w-full flex-col items-start shrink-0 rounded-2xl bg-white shadow p-8 gap-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 text-gray-500 hover:bg-[#05B29F]/10 hover:text-[#05B29F] transition-all text-sm font-bold w-fit"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
            목록으로 돌아가기
          </button>

          <h1 className="text-3xl font-bold text-[#1a3a35]">
            {isEditMode ? '게시글 수정' : '게시글 작성'}
          </h1>

          <div className="flex flex-col w-full gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-[#1a3a35]">카테고리</p>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-[#D1D5DC] text-sm text-[#1a3a35] bg-white outline-none cursor-pointer focus:border-[#05B29F]"
              >
                <option value="">카테고리를 선택하세요</option>
                {CATEGORY_OPTIONS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-[#1a3a35]">제목</p>
              <input
                type="text"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-[#D1D5DC] text-sm text-[#1a3a35] placeholder-[#9CA3AF] outline-none focus:border-[#05B29F]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-[#1a3a35]">
                나의 파티 프리셋 불러오기{' '}
                <span className="text-[#9CA3AF] font-normal whitespace-nowrap">(선택)</span>
              </p>
              <select
                value={presetId}
                onChange={(event) => setPresetId(event.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-[#D1D5DC] text-sm text-[#1a3a35] bg-white outline-none cursor-pointer focus:border-[#05B29F]"
              >
                <option value="">프리셋을 선택하세요</option>
                {isEditMode && presetId === 'default' && (
                  <option value="default">기존 파티</option>
                )}
                {presets.map((preset) => (
                  <option key={preset.partyId} value={preset.partyId}>
                    {preset.deckname || `프리셋 ${preset.partyId}`}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-[#1a3a35]">내용</p>
              <textarea
                placeholder="내용을 입력하세요"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                className="w-full h-45 min-h-[180px] p-3 rounded-lg border border-[#D1D5DC] text-sm text-[#1a3a35] placeholder-[#9CA3AF] outline-none resize-none focus:border-[#05B29F]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-[#1a3a35]">
                이미지 첨부 <span className="text-[#9CA3AF] font-normal">(선택)</span>
              </p>

              <label
                htmlFor="write-image"
                className="flex flex-col items-center justify-center w-full h-38 min-h-[152px] gap-2 cursor-pointer rounded-[10px] border border-dashed border-[#D1D5DC] text-[#9CA3AF] hover:bg-gray-50 transition-colors"
              >
                <span className="text-3xl">🖼️</span>
                <span className="text-sm">클릭하면 이미지를 업로드</span>
                <span className="text-xs">PNG, JPG, GIF 이하 5MB</span>
                <input
                  id="write-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              {imgUrl && (
                <img
                  src={imgUrl}
                  alt="업로드 이미지"
                  className="w-full h-48 object-contain rounded-lg border border-gray-100"
                />
              )}
            </div>
          </div>

          <div className="flex w-full gap-4">
            {isEditMode ? (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleUpdate}
                className="flex-1 h-12 rounded-lg bg-[#05B29F] text-white text-sm font-semibold hover:bg-[#049e8d] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '수정 중...' : '수정'}
              </button>
            ) : (
              <>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSaveDraft}
                  className="flex-1 h-12 rounded-lg border border-[#D1D5DC] text-sm text-[#4B5563] hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? '저장 중...' : '임시 저장'}
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  className="flex-1 h-12 rounded-lg bg-[#05B29F] text-white text-sm font-semibold hover:bg-[#049e8d] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? '작성 중...' : '작성 완료'}
                </button>
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default WritePost;