import axios from 'axios';

export const BASE_URL: string = import.meta.env.VITE_BASE_URL ?? '';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL ?? '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default instance;
