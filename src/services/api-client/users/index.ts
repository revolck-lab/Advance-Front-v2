import { apiClient } from "@/lib/axios-config";
import { API_ROUTES } from "@/constants/api-endpoints";
import { User, CreateUserDTO, UpdateUserDTO } from "@/types/users";
import { ApiResponse, ApiListResponse } from "@/types/shared/api-responses";

/**
 * Serviço para gerenciamento de usuários
 * Encapsula todas as operações relacionadas a usuários
 */
export const userService = {
  /**
   * Obtém perfil do usuário autenticado
   */
  async getProfile(): Promise<ApiResponse<User>> {
    const response = await apiClient.get<ApiResponse<User>>(
      API_ROUTES.USERS.PROFILE,
    );
    return response.data;
  },

  /**
   * Atualiza o perfil do usuário
   */
  async updateProfile(data: UpdateUserDTO): Promise<ApiResponse<User>> {
    const response = await apiClient.put<ApiResponse<User>>(
      API_ROUTES.USERS.PROFILE,
      data,
    );
    return response.data;
  },

  /**
   * Obtém lista de usuários (somente para admin)
   */
  async getUsers(params?: {
    page?: number;
    limit?: number;
    role_id?: number;
  }): Promise<ApiListResponse<User>> {
    const response = await apiClient.get<ApiListResponse<User>>(
      API_ROUTES.USERS.BASE,
      { params },
    );
    return response.data;
  },

  /**
   * Obtém detalhes de um usuário específico
   */
  async getUserById(id: number): Promise<ApiResponse<User>> {
    const response = await apiClient.get<ApiResponse<User>>(
      `${API_ROUTES.USERS.BASE}/${id}`,
    );
    return response.data;
  },

  /**
   * Cria um novo usuário (função administrativa)
   */
  async createUser(data: CreateUserDTO): Promise<ApiResponse<User>> {
    const response = await apiClient.post<ApiResponse<User>>(
      API_ROUTES.USERS.BASE,
      data,
    );
    return response.data;
  },

  /**
   * Atualiza dados de um usuário (função administrativa)
   */
  async updateUser(
    id: number,
    data: UpdateUserDTO,
  ): Promise<ApiResponse<User>> {
    const response = await apiClient.put<ApiResponse<User>>(
      `${API_ROUTES.USERS.BASE}/${id}`,
      data,
    );
    return response.data;
  },

  /**
   * Desativa/ativa um usuário (função administrativa)
   */
  async toggleUserStatus(
    id: number,
    active: boolean,
  ): Promise<ApiResponse<User>> {
    const response = await apiClient.patch<ApiResponse<User>>(
      `${API_ROUTES.USERS.BASE}/${id}/status`,
      {
        status: active ? 1 : 0,
      },
    );
    return response.data;
  },
};
