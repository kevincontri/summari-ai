import { create } from 'zustand'
import api from "../api/axios.ts";

interface AuthState {
  token: string | null;
  login: (email: string, password: string, navigate: (path: string) => void) => Promise<void>;
  logout: (navigate: (path: string) => void) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  login: async (email, password, navigate) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { newToken } = response.data.access_token;
      localStorage.setItem('token', newToken);
      set({ token: newToken });
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  },
  logout: (navigate) => {
    localStorage.removeItem('token');
    set({ token: null });
    navigate('/login');
  }
}));