import { create } from "zustand";

interface UserResponse {
  id: number;
  username: string;
  email: string;
}

interface AuthState {
  user: UserResponse | null;
  login: (user: UserResponse) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));