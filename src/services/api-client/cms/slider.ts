import { apiClient } from "@/lib/axios-config";
import { API_ROUTES } from "@/constants/api-endpoints";
import { Slider, CreateSliderDTO, UpdateSliderDTO } from "@/types/cms/slider";
import { ApiResponse, ApiListResponse } from "@/types/shared/api-responses";

/**
 * Serviço para gerenciamento de sliders
 */
export const sliderService = {
  /**
   * Lista todos os sliders
   */
  async listSliders(): Promise<ApiListResponse<Slider>> {
    const response = await apiClient.get<ApiListResponse<Slider>>(
      API_ROUTES.CMS.SLIDER.LIST,
    );
    return response.data;
  },

  /**
   * Obtém um slider específico por ID
   */
  async getSliderById(id: number): Promise<ApiResponse<Slider>> {
    const response = await apiClient.get<ApiResponse<Slider>>(
      `${API_ROUTES.CMS.SLIDER.BASE}/${id}`,
    );
    return response.data;
  },

  /**
   * Cria um novo slider
   * @param data Dados do slider
   * @param imageFile Arquivo de imagem
   */
  async createSlider(
    data: CreateSliderDTO,
    imageFile: File,
  ): Promise<ApiResponse<Slider>> {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("url_link", data.url_link);
    formData.append("device", data.device);
    formData.append("image_url", imageFile);

    const response = await apiClient.post<ApiResponse<Slider>>(
      API_ROUTES.CMS.SLIDER.CREATE,
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
   * Atualiza um slider existente
   * @param id ID do slider
   * @param data Dados do slider
   * @param imageFile Novo arquivo de imagem (opcional)
   */
  async updateSlider(
    id: number,
    data: UpdateSliderDTO,
    imageFile?: File,
  ): Promise<ApiResponse<Slider>> {
    const formData = new FormData();

    if (data.title) formData.append("title", data.title);
    if (data.url_link) formData.append("url_link", data.url_link);
    if (data.device) formData.append("device", data.device);
    if (imageFile) formData.append("image_url", imageFile);

    const response = await apiClient.put<ApiResponse<Slider>>(
      API_ROUTES.CMS.SLIDER.UPDATE(id),
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
   * Remove um slider
   */
  async deleteSlider(id: number): Promise<ApiResponse<void>> {
    const response = await apiClient.delete<ApiResponse<void>>(
      API_ROUTES.CMS.SLIDER.DELETE(id),
    );
    return response.data;
  },
};
