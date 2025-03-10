import { useCallback } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/constants/routes";
import { RoleLevel } from "@/types/roles";

/**
 * Hook personalizado para gerenciamento de autenticação
 * Combina Zustand store com funcionalidades específicas do React
 */
export function useAuth() {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login: storeLogin,
    logout,
    clearError,
  } = useAuthStore();

  const router = useRouter();

  /**
   * Login com redirecionamento baseado no papel do usuário
   */
  const loginWithRedirect = useCallback(
    async (username: string, password: string) => {
      try {
        const response = await storeLogin({ login: username, password });

        // Redireciona com base no papel do usuário
        const roleId = response.user.role_id;

        switch (roleId) {
          case RoleLevel.TEACHER:
            router.push(APP_ROUTES.DASHBOARD.TEACHER.HOME);
            break;
          case RoleLevel.STUDENT:
            router.push(APP_ROUTES.DASHBOARD.STUDENT.HOME);
            break;
          case RoleLevel.COMPANY:
            router.push(APP_ROUTES.DASHBOARD.COMPANY.HOME);
            break;
          case RoleLevel.ADMIN:
            router.push(APP_ROUTES.DASHBOARD.ADMIN.HOME);
            break;
          // Adicionar outros casos conforme necessário
          default:
            router.push(APP_ROUTES.DASHBOARD.HOME);
        }

        return { success: true };
      } catch (error) {
        return { success: false, error };
      }
    },
    [storeLogin, router],
  );

  /**
   * Logout com redirecionamento para login
   */
  const logoutWithRedirect = useCallback(() => {
    logout();
    router.push(APP_ROUTES.AUTH.LOGIN);
  }, [logout, router]);

  /**
   * Verifica se o usuário tem o nível de acesso necessário
   */
  const hasAccess = useCallback(
    (requiredLevel: RoleLevel) => {
      if (!user) return false;

      // Implementação simples - pode ser refinada com base nas regras de negócio
      // O correto seria verificar a tabela de permissões que definimos nos tipos
      return user.role_id >= requiredLevel;
    },
    [user],
  );

  /**
   * Redirecionamento se não estiver autenticado (para proteção de rotas)
   */
  const checkAuth = useCallback(() => {
    if (!isAuthenticated && !isLoading) {
      router.push(APP_ROUTES.AUTH.LOGIN);
      return false;
    }
    return true;
  }, [isAuthenticated, isLoading, router]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login: loginWithRedirect,
    logout: logoutWithRedirect,
    clearError,
    hasAccess,
    checkAuth,
  };
}
