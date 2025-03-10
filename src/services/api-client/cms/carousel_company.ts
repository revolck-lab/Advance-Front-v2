import { apiClient } from "@/lib/axios-config";
import { API_ROUTES } from "@/constants/api-endpoints";
import {
  CarouselCompany,
  CreateCarouselCompanyDTO,
  UpdateCarouselCompanyDTO,
} from "@/types/cms/carousel_company";
import { ApiResponse, ApiListResponse } from "@/types/shared/api-responses";

/**
 * Serviço para gerenciamento de carrosséis de empresas
 */
export const carouselCompanyService = {
  /**
   * Lista todos os carrosséis de empresas
   */
  async listCarouselCompanies(): Promise<ApiListResponse<CarouselCompany>> {
    const response = await apiClient.get<ApiListResponse<CarouselCompany>>(
      API_ROUTES.CMS.CAROUSEL_COMPANY.LIST,
    );
    return response.data;
  },

  /**
   * Obtém um carrossel de empresa específico por ID
   */
  async getCarouselCompanyById(
    id: number,
  ): Promise<ApiResponse<CarouselCompany>> {
    const response = await apiClient.get<ApiResponse<CarouselCompany>>(
      `${API_ROUTES.CMS.CAROUSEL_COMPANY.BASE}/${id}`,
    );
    return response.data;
  },

  /**
   * Cria um novo carrossel de empresa
   */
  async createCarouselCompany(
    data: CreateCarouselCompanyDTO,
  ): Promise<ApiResponse<CarouselCompany>> {
    const response = await apiClient.post<ApiResponse<CarouselCompany>>(
      API_ROUTES.CMS.CAROUSEL_COMPANY.CREATE,
      data,
    );
    return response.data;
  },

  /**
   * Atualiza um carrossel de empresa existente
   */
  async updateCarouselCompany(
    id: number,
    data: UpdateCarouselCompanyDTO,
  ): Promise<ApiResponse<CarouselCompany>> {
    const response = await apiClient.put<ApiResponse<CarouselCompany>>(
      API_ROUTES.CMS.CAROUSEL_COMPANY.UPDATE(id),
      data,
    );
    return response.data;
  },

  /**
   * Remove um carrossel de empresa
   */
  async deleteCarouselCompany(id: number): Promise<ApiResponse<void>> {
    const response = await apiClient.delete<ApiResponse<void>>(
      API_ROUTES.CMS.CAROUSEL_COMPANY.DELETE(id),
    );
    return response.data;
  },
};
