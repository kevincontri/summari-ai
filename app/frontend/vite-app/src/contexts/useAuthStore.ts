import { create } from 'zustand'
import api from "../api/axios.ts";
import { queryClient } from "../lib/queryClient.ts";

interface AuthState {
  token: string | null;
  register: (username: string, email: string, password: string, navigate: (path: string) => void) => Promise<void>;
  login: (email: string, password: string, navigate: (path: string) => void) => Promise<void>;
  logout: (navigate: (path: string) => void) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  login: async (email: string, password: string, navigate: (path: string) => void) => {
    const response = await api.post('/auth/login', { email, password });
    const newToken = response.data.access_token;
    localStorage.setItem('token', newToken);
    set({ token: newToken });
    navigate('/dashboard');
  },
  logout: (navigate: (path: string) => void) => {
    localStorage.removeItem('token');
    set({ token: null });
    queryClient.clear();
    navigate('/login');
  },
  register: async (username: string, email: string, password: string, navigate: (path: string) => void) => {
    await api.post('/auth/register', { username, email, password });
    
    // After successful registration, automatically log in the user
    await api.post('/auth/login', { email, password });
    const response = await api.post('/auth/login', { email, password });
    const newToken = response.data.access_token;
    localStorage.setItem('token', newToken);
    set({ token: newToken });
    navigate('/dashboard');
  }
}));