import { create } from "zustand";
import { userService } from "@/services/api-client/users";
import { companyService } from "@/services/api-client/users/company";
import { User } from "@/types/users";
import { Company } from "@/types/users/company";
import { RoleLevel } from "@/types/roles";

interface UserState {
  // Estado
  currentUser: User | Company | null;
  isLoading: boolean;
  error: string | null;

  // Ações
  fetchUserProfile: () => Promise<void>;
  fetchCompanyProfile: () => Promise<void>;
  updateUserProfile: (data: any) => Promise<void>;
  updateCompanyProfile: (data: any) => Promise<void>;
  clearUserData: () => void;
  clearError: () => void;
}

export const useUserStore = create<UserState>()((set, get) => ({
  // Estado inicial
  currentUser: null,
  isLoading: false,
  error: null,

  // Ações
  fetchUserProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await userService.getProfile();
      set({ currentUser: data, isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || "Erro ao buscar perfil do usuário",
      });
    }
  },

  fetchCompanyProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await companyService.getProfile();
      set({ currentUser: data, isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || "Erro ao buscar perfil da empresa",
      });
    }
  },

  updateUserProfile: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await userService.updateProfile(userData);
      set({ currentUser: data, isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || "Erro ao atualizar perfil do usuário",
      });
      throw error;
    }
  },

  updateCompanyProfile: async (companyData) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await companyService.updateProfile(companyData);
      set({ currentUser: data, isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || "Erro ao atualizar perfil da empresa",
      });
      throw error;
    }
  },

  clearUserData: () => {
    set({ currentUser: null });
  },

  clearError: () => {
    set({ error: null });
  },
}));
