import instance from './axios';

// –– Type Definitions –––––––––––––––––––––––––––
// API 응답 타입 정의
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// User 타입 정의
export interface User {
  userId: number;
  loginId: string;
  nickname: string;
  status: boolean;
  introduce: string;
  createdAt: string;
}

// 로그인 응답 타입 정의
interface LoginResponse {
  token: string;
  user: User;
}

// –– Auth API ––––––––––––––––––––––––––––––––––––

// LOGIN
export async function login(loginId: string, password: string): Promise<LoginResponse> {
  const { data } = await instance.post<ApiResponse<LoginResponse>>('/user/login', {
    loginId,
    password,
  });
  return data.data;
}

// REGISTER
export async function register(loginId: string, nickname: string, password: string) {
  const { data } = await instance.post('/user/register', { loginId, nickname, password });
  return data;
}

// NICKNAME CHECK
export async function checkNickname(nickname: string) {
  const { data } = await instance.get(`/user/check?nickname=${nickname}`);
  return data;
}

// ID CHECK
export async function checkLoginId(loginId: string) {
  const { data } = await instance.get(`/user/check?loginId=${loginId}`);
  return data;
}

// –– User API ––––––––––––––––––––––––––––––––––––

// GET USER INFO
export async function getMe(): Promise<User> {
  const { data } = await instance.get<ApiResponse<User>>('/user/me');
  return data.data;
}

// UPDATE USER INFO
export async function updateMe(nickname: string, introduce: string) {
  const { data } = await instance.put('/user/me', { nickname, introduce });
  return data;
}

// DELETE USER
export async function withdraw(password: string) {
  const { data } = await instance.post('/user/withdraw', { password });
  return data;
}
