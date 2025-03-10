import { useEffect } from "react";
import { useUserStore } from "@/store/user-store";
import { useAuthStore } from "@/store/auth-store";
import { RoleLevel } from "@/types/roles";

/**
 * Hook personalizado para gerenciamento de usuário
 * Combina funcionalidades do user store com lógica específica de UI
 */
export function useUser() {
  const {
    currentUser,
    isLoading,
    error,
    fetchUserProfile,
    fetchCompanyProfile,
    updateUserProfile,
    updateCompanyProfile,
    clearError,
  } = useUserStore();

  const { user: authUser } = useAuthStore();

  // Efeito para carregar o perfil apropriado com base no role_id
  useEffect(() => {
    if (authUser && !currentUser && !isLoading) {
      if (authUser.role_id === RoleLevel.COMPANY) {
        fetchCompanyProfile();
      } else {
        fetchUserProfile();
      }
    }
  }, [authUser, currentUser, isLoading, fetchUserProfile, fetchCompanyProfile]);

  // Helper para determinar tipo de usuário
  const isCompany = authUser?.role_id === RoleLevel.COMPANY;

  // Função abstrata para atualizar perfil com base no tipo
  const updateProfile = async (data: any) => {
    if (isCompany) {
      return updateCompanyProfile(data);
    } else {
      return updateUserProfile(data);
    }
  };

  // Formatador de nome de usuário para exibição na UI
  const getDisplayName = () => {
    if (!currentUser) return "";

    if (isCompany) {
      const company = currentUser as any; // Type casting
      return company.trade_name || company.business_name || "Empresa";
    } else {
      const user = currentUser as any; // Type casting
      return user.name || "Usuário";
    }
  };

  return {
    user: currentUser,
    isLoading,
    error,
    isCompany,
    updateProfile,
    getDisplayName,
    clearError,
  };
}
