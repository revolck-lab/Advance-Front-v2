import { apiClient } from "@/lib/axios-config";
import { API_ROUTES } from "@/constants/api-endpoints";
import {
  Vacancy,
  VacancyDetails,
  CreateVacancyDTO,
  UpdateVacancyDTO,
  VacancyFilters,
  Application,
  CreateApplicationDTO,
} from "@/types/vacancies";
import { ApiResponse, ApiListResponse } from "@/types/shared/api-responses";

/**
 * Serviço para gerenciamento de vagas
 */
export const vacancyService = {
  /**
   * Obtém lista de vagas com paginação e filtros
   */
  async getVacancies(
    filters?: VacancyFilters,
    page = 1,
    limit = 10,
  ): Promise<ApiListResponse<VacancyDetails>> {
    const params = { ...filters, page, limit };
    const response = await apiClient.get<ApiListResponse<VacancyDetails>>(
      API_ROUTES.VACANCY.LIST,
      { params },
    );
    return response.data;
  },

  /**
   * Obtém detalhes de uma vaga específica
   */
  async getVacancyDetails(id: number): Promise<ApiResponse<VacancyDetails>> {
    const response = await apiClient.get<ApiResponse<VacancyDetails>>(
      API_ROUTES.VACANCY.DETAILS(id),
    );
    return response.data;
  },

  /**
   * Cria uma nova vaga
   */
  async createVacancy(data: CreateVacancyDTO): Promise<ApiResponse<Vacancy>> {
    const response = await apiClient.post<ApiResponse<Vacancy>>(
      API_ROUTES.VACANCY.CREATE,
      data,
    );
    return response.data;
  },

  /**
   * Atualiza uma vaga existente
   */
  async updateVacancy(
    id: number,
    data: UpdateVacancyDTO,
  ): Promise<ApiResponse<Vacancy>> {
    const response = await apiClient.put<ApiResponse<Vacancy>>(
      API_ROUTES.VACANCY.UPDATE(id),
      data,
    );
    return response.data;
  },

  /**
   * Remove uma vaga
   */
  async deleteVacancy(id: number): Promise<ApiResponse<void>> {
    const response = await apiClient.delete<ApiResponse<void>>(
      API_ROUTES.VACANCY.DELETE(id),
    );
    return response.data;
  },

  /**
   * Obtém vagas da empresa logada (para empresas)
   */
  async getCompanyVacancies(
    companyId: number,
    page = 1,
    limit = 10,
  ): Promise<ApiListResponse<VacancyDetails>> {
    const params = { company_id: companyId, page, limit };
    const response = await apiClient.get<ApiListResponse<VacancyDetails>>(
      API_ROUTES.VACANCY.LIST,
      { params },
    );
    return response.data;
  },

  /**
   * Obtém áreas de trabalho (para filtros e cadastro)
   */
  async getAreas(): Promise<ApiListResponse<any>> {
    const endpoint = `${API_ROUTES.VACANCY.BASE}/areas`;
    const response = await apiClient.get<ApiListResponse<any>>(endpoint);
    return response.data;
  },

  /**
   * Candidata-se a uma vaga
   */
  async applyToVacancy(
    data: CreateApplicationDTO,
  ): Promise<ApiResponse<Application>> {
    const endpoint = `${API_ROUTES.VACANCY.BASE}/${data.vacancy_id}/apply`;
    const response = await apiClient.post<ApiResponse<Application>>(endpoint);
    return response.data;
  },

  /**
   * Obtém candidaturas do usuário logado
   */
  async getUserApplications(
    page = 1,
    limit = 10,
  ): Promise<ApiListResponse<Application>> {
    const endpoint = `${API_ROUTES.VACANCY.BASE}/applications`;
    const response = await apiClient.get<ApiListResponse<Application>>(
      endpoint,
      {
        params: { page, limit },
      },
    );
    return response.data;
  },

  /**
   * Obtém candidaturas de uma vaga específica (para empresas)
   */
  async getVacancyApplications(
    vacancyId: number,
    page = 1,
    limit = 10,
  ): Promise<ApiListResponse<Application>> {
    const endpoint = `${API_ROUTES.VACANCY.BASE}/${vacancyId}/applications`;
    const response = await apiClient.get<ApiListResponse<Application>>(
      endpoint,
      {
        params: { page, limit },
      },
    );
    return response.data;
  },
};
