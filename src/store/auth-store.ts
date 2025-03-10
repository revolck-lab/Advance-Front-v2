import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "@/services/auth/auth";
import { LoginCredentials, LoginResponse, UserInfo } from "@/types/auth";

interface AuthState {
  // Estado
  user: UserInfo | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Ações
  login: (credentials: LoginCredentials) => Promise<LoginResponse>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Ações
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login(credentials);
          set({
            isLoading: false,
            isAuthenticated: true,
            user: response.user,
          });
          return response;
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Falha na autenticação",
          });
          throw error;
        }
      },

      logout: () => {
        authService.logout();
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage", // Nome usado para persistência
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
