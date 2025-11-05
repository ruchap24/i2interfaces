import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const api = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  signup: (data: { email: string; password: string; name: string }) =>
    api.post('/auth/signup', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

export const profileAPI = {
  getMyProfile: () => api.get('/profile/me'),
  getAllProfiles: () => api.get('/profile/all'),
  getProfile: (id: string) => api.get(`/profile/${id}`),
  updateProfile: (data: any) => api.patch('/profile/me', data),
};

export const experienceAPI = {
  create: (data: any) => api.post('/experience', data),
  update: (id: string, data: any) => api.patch(`/experience/${id}`, data),
  delete: (id: string) => api.delete(`/experience/${id}`),
};

export const educationAPI = {
  create: (data: any) => api.post('/education', data),
  update: (id: string, data: any) => api.patch(`/education/${id}`, data),
  delete: (id: string) => api.delete(`/education/${id}`),
};

export const skillAPI = {
  create: (data: any) => api.post('/skill', data),
  delete: (id: string) => api.delete(`/skill/${id}`),
};