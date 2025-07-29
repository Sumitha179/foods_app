import { create } from 'zustand';
import { getCurrentUser } from '@/lib/appwrite'; // Adjust path as needed
import { User } from '@/type';

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  fetchAuthenticatedUser: () => Promise<void>;
  setIsAuthenticated: (value: boolean) => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
};

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,

  fetchAuthenticatedUser: async () => {
    try {
      const user = await getCurrentUser();
      if (user) {
        set({ user:user as User, isAuthenticated: true });
      } else {
        set({ user: null, isAuthenticated: false });
      }
    } catch (error) {
      console.log("No user session found", error);
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },

  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ isLoading: loading }),
}));

export default useAuthStore;