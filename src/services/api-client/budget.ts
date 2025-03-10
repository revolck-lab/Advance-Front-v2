import { apiClient } from "@/lib/axios-config";
import { API_ROUTES } from "@/constants/api-endpoints";
import { Budget, CreateBudgetDTO } from "@/types/budget";
import { ApiResponse, ApiListResponse } from "@/types/shared/api-responses";

/**
 * Serviço para gerenciamento de orçamentos
 */
export const budgetService = {
  /**
   * Obtém lista de orçamentos (admin)
   */
  async getBudgets(page = 1, limit = 10): Promise<ApiListResponse<Budget>> {
    const response = await apiClient.get<ApiListResponse<Budget>>(
      API_ROUTES.BUDGET.LIST,
      { params: { page, limit } },
    );
    return response.data;
  },

  /**
   * Obtém detalhes de um orçamento específico
   */
  async getBudgetById(id: number): Promise<ApiResponse<Budget>> {
    const response = await apiClient.get<ApiResponse<Budget>>(
      API_ROUTES.BUDGET.DETAILS(id),
    );
    return response.data;
  },

  /**
   * Cria uma nova solicitação de orçamento
   */
  async createBudget(data: CreateBudgetDTO): Promise<ApiResponse<Budget>> {
    const response = await apiClient.post<ApiResponse<Budget>>(
      API_ROUTES.BUDGET.CREATE,
      data,
    );
    return response.data;
  },

  /**
   * Remove uma solicitação de orçamento
   */
  async deleteBudget(id: number): Promise<ApiResponse<void>> {
    const response = await apiClient.delete<ApiResponse<void>>(
      API_ROUTES.BUDGET.DETAILS(id),
    );
    return response.data;
  },

  /**
   * Obtém serviços disponíveis para orçamento
   */
  async getServices(): Promise<ApiListResponse<any>> {
    const endpoint = `${API_ROUTES.BUDGET.BASE}/services`;
    const response = await apiClient.get<ApiListResponse<any>>(endpoint);
    return response.data;
  },
};
