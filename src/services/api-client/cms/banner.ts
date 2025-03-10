import { apiClient } from "@/lib/axios-config";
import { API_ROUTES } from "@/constants/api-endpoints";
import { Banner, CreateBannerDTO, UpdateBannerDTO } from "@/types/cms/banner";
import { ApiResponse, ApiListResponse } from "@/types/shared/api-responses";

/**
 * Serviço para gerenciamento de banners do site
 */
export const bannerService = {
  /**
   * Lista todos os banners
   */
  async listBanners(): Promise<ApiListResponse<Banner>> {
    const response = await apiClient.get<ApiListResponse<Banner>>(
      API_ROUTES.CMS.BANNER.LIST,
    );
    return response.data;
  },

  /**
   * Obtém detalhes de um banner específico
   */
  async getBannerById(id: number): Promise<ApiResponse<Banner>> {
    const response = await apiClient.get<ApiResponse<Banner>>(
      `${API_ROUTES.CMS.BANNER.BASE}/${id}`,
    );
    return response.data;
  },

  /**
   * Cria um novo banner
   * @param data Dados do banner e arquivo de imagem
   */
  async createBanner(
    data: CreateBannerDTO,
    imageFile: File,
  ): Promise<ApiResponse<Banner>> {
    // Criamos um FormData para enviar o arquivo junto com os outros dados
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("url_link", data.url_link);
    formData.append("device", data.device);
    formData.append("image_url", imageFile);

    const response = await apiClient.post<ApiResponse<Banner>>(
      API_ROUTES.CMS.BANNER.CREATE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  },

  /**
   * Atualiza um banner existente
   * @param id ID do banner
   * @param data Dados do banner
   * @param imageFile Novo arquivo de imagem (opcional)
   */
  async updateBanner(
    id: number,
    data: UpdateBannerDTO,
    imageFile?: File,
  ): Promise<ApiResponse<Banner>> {
    const formData = new FormData();

    // Adiciona dados existentes
    if (data.title) formData.append("title", data.title);
    if (data.url_link) formData.append("url_link", data.url_link);
    if (data.device) formData.append("device", data.device);

    // Adiciona nova imagem se fornecida
    if (imageFile) {
      formData.append("image_url", imageFile);
    }

    const response = await apiClient.put<ApiResponse<Banner>>(
      API_ROUTES.CMS.BANNER.UPDATE(id),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  },

  /**
   * Remove um banner
   */
  async deleteBanner(id: number): Promise<ApiResponse<void>> {
    const response = await apiClient.delete<ApiResponse<void>>(
      API_ROUTES.CMS.BANNER.DELETE(id),
    );
    return response.data;
  },
};
