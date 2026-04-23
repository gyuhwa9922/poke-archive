import axios from 'axios';

// –– Setting up an Axios instance –––––––––––––––––––––––––––
export const BASE_URL: string = import.meta.env.VITE_BASE_URL ?? '';

// Create Axios instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL ?? '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Auto Attach Token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Error Handling
instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

// –– Public Axios instance (for requests without authentication) –––––––––––––––––––––––––––
export const publicInstance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BASE_URL ?? '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
  },
});

export default instance;
