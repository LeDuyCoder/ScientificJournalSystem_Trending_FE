import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  
  loginSuccess: () => set({ 
    isAuthenticated: true 
  }),
  
  logout: () => set({ 
    isAuthenticated: false 
  }),
}));
