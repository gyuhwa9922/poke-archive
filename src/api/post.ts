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

export async function getPosts(): Promise<Post[]> {
  const { data } = await instance.get('/posts?size=1000');

  return data?.data?.content ?? data?.data ?? [];
}