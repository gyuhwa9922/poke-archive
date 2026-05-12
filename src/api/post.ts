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

export interface PartyPreset {
  partyId: number;
  deckname: string;
  pocketmons: number[];
  gender: string;
}

export interface PostPresetPayload {
  deckname: string;
  pocketmons: number[];
  gender: string;
}

export interface CreatePostRequest {
  title: string;
  category: string;
  content: string;
  preset: PostPresetPayload | null;
  imgUrl: string;
}

export interface UpdatePostRequest extends CreatePostRequest {}

export interface PostDetail {
  postId: number;
  title: string;
  content: string;
  category: string;
  nickname?: string;
  createdAt?: string;
  viewCount?: number;
  favoriteCount?: number;
  commentCount?: number;
  imgUrl?: string;
  preset?: PostPresetPayload | null;
}

export async function getPosts(): Promise<Post[]> {
  const { data } = await instance.get('/posts?size=1000');

  return data?.data?.content ?? data?.data ?? [];
}

export async function createPost(payload: CreatePostRequest): Promise<PostDetail> {
  const { data } = await instance.post('/posts', payload);

  return data?.data ?? data;
}

export async function publishPost(postId: number): Promise<void> {
  await instance.put(`/posts/${postId}/publish`);
}

export async function getPostDetail(postId: number | string): Promise<PostDetail> {
  const { data } = await instance.get(`/posts/${postId}`);

  return data?.data ?? data;
}

export async function updatePost(
  postId: number | string,
  payload: UpdatePostRequest,
): Promise<void> {
  await instance.put(`/posts/${postId}`, payload);
}

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

export async function getPartyPresets(): Promise<PartyPreset[]> {
  const { data } = await instance.get('/party');

  const result = data?.data ?? data;

  return Array.isArray(result) ? result : [];
}