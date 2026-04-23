import instance, { publicInstance } from './axios';

// –– Type Definitions –––––––––––––––––––––––––––
// API response type definition
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// User type definition
export interface User {
  userId: number;
  loginId: string;
  nickname: string;
  status: boolean;
  introduce: string;
  createdAt: string;
}

// Define login response type
interface LoginResponse {
  token: string;
  user: User;
}

// Define duplicate confirmation response type
interface ApiCheckResponse {
  success: boolean;
  data: { exists: boolean };
}

export interface CheckResponse {
  exists: boolean;
}

// Duplicate check UI state type
export interface CheckResult {
  text: string;
  ok: boolean;
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
export async function register(loginId: string, nickname: string, password: string): Promise<LoginResponse> {
  const { data } = await instance.post<ApiResponse<LoginResponse>>('/user/register', { loginId, nickname, password });
  return data.data;
}

// NICKNAME CHECK
export async function checkNickname(nickname: string): Promise<CheckResponse> {
  const { data } = await publicInstance.get<ApiCheckResponse>('/user/check-nickname', {
    params: { nickname, _t: Date.now() },
  });
  const exists = data?.data?.exists ?? (data as unknown as CheckResponse)?.exists ?? false;
  return { exists };
}

// ID CHECK
export async function checkLoginId(loginId: string): Promise<CheckResponse> {
  const { data } = await publicInstance.get<ApiCheckResponse>('/user/check-login-id', {
    params: { loginId, _t: Date.now() },
  });
  const exists = data?.data?.exists ?? (data as unknown as CheckResponse)?.exists ?? false;
  return { exists };
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
