import { apiClient } from "@/lib/axios-config";
import { API_ROUTES } from "@/constants/api-endpoints";
import {
  Carousel,
  CreateCarouselDTO,
  UpdateCarouselDTO,
} from "@/types/cms/carousel";
import { ApiResponse, ApiListResponse } from "@/types/shared/api-responses";

/**
 * Serviço para gerenciamento de carrosséis
 */
export const carouselService = {
  /**
   * Lista todos os carrosséis
   */
  async listCarousels(): Promise<ApiListResponse<Carousel>> {
    const response = await apiClient.get<ApiListResponse<Carousel>>(
      API_ROUTES.CMS.CAROUSEL.LIST,
    );
    return response.data;
  },

  /**
   * Obtém um carrossel específico por ID
   */
  async getCarouselById(id: number): Promise<ApiResponse<Carousel>> {
    const response = await apiClient.get<ApiResponse<Carousel>>(
      API_ROUTES.CMS.CAROUSEL.BASE + `/${id}`,
    );
    return response.data;
  },

  /**
   * Cria um novo carrossel
   */
  async createCarousel(
    data: CreateCarouselDTO,
  ): Promise<ApiResponse<Carousel>> {
    const response = await apiClient.post<ApiResponse<Carousel>>(
      API_ROUTES.CMS.CAROUSEL.CREATE,
      data,
    );
    return response.data;
  },

  /**
   * Atualiza um carrossel existente
   */
  async updateCarousel(
    id: number,
    data: UpdateCarouselDTO,
  ): Promise<ApiResponse<Carousel>> {
    const response = await apiClient.put<ApiResponse<Carousel>>(
      API_ROUTES.CMS.CAROUSEL.UPDATE(id),
      data,
    );
    return response.data;
  },

  /**
   * Remove um carrossel
   */
  async deleteCarousel(id: number): Promise<ApiResponse<void>> {
    const response = await apiClient.delete<ApiResponse<void>>(
      API_ROUTES.CMS.CAROUSEL.DELETE(id),
    );
    return response.data;
  },
};
