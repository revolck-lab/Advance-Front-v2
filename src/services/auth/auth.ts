import { apiClient } from "@/lib/axios-config";
import { API_ROUTES } from "@/constants/api-endpoints";
import {
  LoginCredentials,
  LoginResponse,
  PasswordRecoveryRequest,
  PasswordResetRequest,
} from "@/types/auth";
import { setLocalStorage, removeLocalStorage } from "@/utils/storage";
import { STORAGE_KEYS } from "@/constants/storage-keys";

/**
 * Serviço de autenticação - encapsula todas as operações relacionadas à autenticação
 */
export const authService = {
  /**
   * Realiza login do usuário
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      API_ROUTES.AUTH.LOGIN,
      credentials,
    );

    // Armazena token e dados do usuário
    if (response.data.token) {
      apiClient.setTokens(response.data.token);
      setLocalStorage(STORAGE_KEYS.USER_INFO, response.data.user);
    }

    return response.data;
  },

  /**
   * Realiza o registro de um novo usuário
   */
  async register(userData: any): Promise<any> {
    const response = await apiClient.post(API_ROUTES.AUTH.REGISTER, userData);
    return response.data;
  },

  /**
   * Solicita recuperação de senha
   */
  async requestPasswordRecovery(data: PasswordRecoveryRequest): Promise<any> {
    const response = await apiClient.post(
      API_ROUTES.AUTH.PASSWORD_RECOVERY,
      data,
    );
    return response.data;
  },

  /**
   * Redefine a senha do usuário
   */
  async resetPassword(token: string, data: PasswordResetRequest): Promise<any> {
    const response = await apiClient.put(API_ROUTES.AUTH.PASSWORD_RESET, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  /**
   * Realiza logout do usuário
   */
  logout(): void {
    // Limpa tokens na instância do Axios
    apiClient.logout();

    // Limpa dados do usuário
    removeLocalStorage(STORAGE_KEYS.USER_INFO);

    // Outros procedimentos de limpeza de estado podem ser adicionados aqui
  },

  /**
   * Verifica se o usuário está autenticado
   */
  isAuthenticated(): boolean {
    // Implementação simples: verifica se existe um token armazenado
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    return !!token;
  },
};
