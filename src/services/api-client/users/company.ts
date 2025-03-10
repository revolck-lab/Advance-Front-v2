import { apiClient } from "@/lib/axios-config";
import { API_ROUTES } from "@/constants/api-endpoints";
import {
  Company,
  CreateCompanyDTO,
  UpdateCompanyDTO,
} from "@/types/users/company";
import { ApiResponse, ApiListResponse } from "@/types/shared/api-responses";

/**
 * Serviço para gerenciamento de empresas
 */
export const companyService = {
  /**
   * Obtém perfil da empresa autenticada
   */
  async getProfile(): Promise<ApiResponse<Company>> {
    const response = await apiClient.get<ApiResponse<Company>>(
      API_ROUTES.COMPANY.PROFILE,
    );
    return response.data;
  },

  /**
   * Atualiza o perfil da empresa
   */
  async updateProfile(data: UpdateCompanyDTO): Promise<ApiResponse<Company>> {
    const response = await apiClient.put<ApiResponse<Company>>(
      API_ROUTES.COMPANY.PROFILE,
      data,
    );
    return response.data;
  },

  /**
   * Obtém lista de empresas (somente para admin)
   */
  async getCompanies(params?: {
    page?: number;
    limit?: number;
    status?: number;
  }): Promise<ApiListResponse<Company>> {
    const response = await apiClient.get<ApiListResponse<Company>>(
      API_ROUTES.COMPANY.BASE,
      { params },
    );
    return response.data;
  },

  /**
   * Obtém detalhes de uma empresa específica
   */
  async getCompanyById(id: number): Promise<ApiResponse<Company>> {
    const response = await apiClient.get<ApiResponse<Company>>(
      `${API_ROUTES.COMPANY.BASE}/${id}`,
    );
    return response.data;
  },

  /**
   * Cria uma nova empresa (função administrativa)
   */
  async createCompany(data: CreateCompanyDTO): Promise<ApiResponse<Company>> {
    const response = await apiClient.post<ApiResponse<Company>>(
      API_ROUTES.COMPANY.BASE,
      data,
    );
    return response.data;
  },

  /**
   * Atualiza dados de uma empresa (função administrativa)
   */
  async updateCompany(
    id: number,
    data: UpdateCompanyDTO,
  ): Promise<ApiResponse<Company>> {
    const response = await apiClient.put<ApiResponse<Company>>(
      `${API_ROUTES.COMPANY.BASE}/${id}`,
      data,
    );
    return response.data;
  },

  /**
   * Desativa/ativa uma empresa (função administrativa)
   */
  async toggleCompanyStatus(
    id: number,
    active: boolean,
  ): Promise<ApiResponse<Company>> {
    const response = await apiClient.patch<ApiResponse<Company>>(
      `${API_ROUTES.COMPANY.BASE}/${id}/status`,
      {
        status: active ? 1 : 0,
      },
    );
    return response.data;
  },

  /**
   * Verifica CNPJ via API externa (opcional)
   */
  async checkCNPJ(cnpj: string): Promise<any> {
    // Implementação de validação de CNPJ via API externa
    // Exemplo simplificado - na prática, usaria um serviço específico
    const cleanCNPJ = cnpj.replace(/\D/g, "");

    // Implementação fictícia - em produção usaria um serviço real
    return {
      valid: cleanCNPJ.length === 14,
      data: {
        razao_social: "Empresa de Exemplo LTDA",
        nome_fantasia: "Exemplo",
        cnpj: cleanCNPJ,
        // outros dados do CNPJ
      },
    };
  },
};
