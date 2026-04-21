import instance from './axios';

// –– Auth API ––––––––––––––––––––––––––––––––––––

// LOGIN
export async function login(loginId: string, password: string) {
  const { data } = await instance.post('/user/login', { loginId, password });
  return data;
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
export async function getMe() {
  const { data } = await instance.get('/user/me');
  return data;
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
