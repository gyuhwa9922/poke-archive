import instance from './axios';

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

export interface PostPresetPayload {
  deckname: string;
  pocketmons: number[];
  gender: string;
}

export interface PartyPreset {
  partyId: number;
  deckname: string;
  pocketmons: number[];
  gender: string;
}

export interface PostDetail {
  postId: number;
  userId: number;
  title: string;
  content: string;
  category: string;
  nickname: string;
  createdAt: string;
  viewCount: number;
  favoriteCount: number;
  commentCount?: number;
  isFavorited?: boolean;
  imgUrl?: string;
  preset?: PostPresetPayload | null;
}

export interface Comment {
  commentId: number;
  userId: number;
  nickname: string;
  content: string;
  createdAt: string;
}

export interface CreatePostRequest {
  title: string;
  category: string;
  content: string;
  preset: PostPresetPayload | null;
  imgUrl: string;
}

export interface UpdatePostRequest {
  title: string;
  category: string;
  content: string;
  preset: PostPresetPayload | null;
  imgUrl: string;
}

export async function getPosts(): Promise<Post[]> {
  const { data } = await instance.get('/posts?size=1000');

  return data?.data?.content ?? data?.data ?? [];
}

// 게시글 작성
export async function createPost(payload: CreatePostRequest): Promise<PostDetail> {
  const { data } = await instance.post('/posts', payload);

  return data?.data ?? data;
}

// 게시글 발행
export async function publishPost(postId: number): Promise<void> {
  await instance.put(`/posts/${postId}/publish`);
}

// 게시글 상세 조회
export async function getPostDetail(postId: number | string): Promise<PostDetail> {
  const { data } = await instance.get(`/posts/${postId}`);

  return data?.data ?? data;
}

// 게시글 수정
export async function updatePost(
  postId: number | string,
  payload: UpdatePostRequest,
): Promise<void> {
  await instance.put(`/posts/${postId}`, payload);
}

// 게시글 삭제
export async function deletePost(postId: number | string): Promise<void> {
  await instance.delete(`/posts/${postId}`);
}

// 게시글 좋아요 토글
export async function togglePostLike(postId: number | string): Promise<boolean> {
  const response = await instance.put(`/posts/${postId}/favorite`);

  return response.status >= 200 && response.status < 300;
}

// 게시글 댓글 목록 조회
export async function getPostComments(postId: number | string): Promise<Comment[]> {
  const { data } = await instance.get(`/posts/${postId}/comments`);

  return Array.isArray(data?.data) ? data.data : [];
}

// 댓글 작성
export async function createComment(
  postId: number | string,
  content: string,
): Promise<Comment> {
  const { data } = await instance.post(`/posts/${postId}/comments`, {
    content,
  });

  return data?.data ?? data;
}

// 댓글 수정
export async function updateComment(
  commentId: number | string,
  content: string,
): Promise<void> {
  await instance.put(`/comments/${commentId}`, {
    content,
  });
}

// 댓글 삭제
export async function deleteComment(commentId: number | string): Promise<void> {
  await instance.delete(`/comments/${commentId}`);
}

// 이미지 업로드
export async function uploadPostImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await instance.post('/images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data?.data?.imageUrl ?? '';
}

// 파티 프리셋 불러오기
export async function getPartyPresets(): Promise<PartyPreset[]> {
  const { data } = await instance.get('/party');

  const result = data?.data ?? data;

  return Array.isArray(result) ? result : [];
}