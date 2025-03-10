import { apiClient } from "@/lib/axios-config";
import { API_ROUTES } from "@/constants/api-endpoints";
import {
  BusinessInformation,
  CreateBusinessInformationDTO,
  UpdateBusinessInformationDTO,
} from "@/types/cms/business_information";
import { ApiResponse, ApiListResponse } from "@/types/shared/api-responses";

/**
 * Serviço para gerenciamento de informações de negócios
 */
export const businessInformationService = {
  /**
   * Lista todas as informações de negócios
   */
  async listBusinessInformation(): Promise<
    ApiListResponse<BusinessInformation>
  > {
    const response = await apiClient.get<ApiListResponse<BusinessInformation>>(
      API_ROUTES.CMS.BUSINESS_INFO.LIST,
    );
    return response.data;
  },

  /**
   * Obtém detalhes de uma informação de negócio específica
   */
  async getBusinessInformationById(
    id: number,
  ): Promise<ApiResponse<BusinessInformation>> {
    const response = await apiClient.get<ApiResponse<BusinessInformation>>(
      `${API_ROUTES.CMS.BUSINESS_INFO.BASE}/${id}`,
    );
    return response.data;
  },

  /**
   * Cria uma nova informação de negócio
   * @param data Dados da informação
   * @param imageFile Arquivo de imagem
   */
  async createBusinessInformation(
    data: CreateBusinessInformationDTO,
    imageFile: File,
  ): Promise<ApiResponse<BusinessInformation>> {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("image_url", imageFile);

    const response = await apiClient.post<ApiResponse<BusinessInformation>>(
      API_ROUTES.CMS.BUSINESS_INFO.CREATE,
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
   * Atualiza uma informação de negócio existente
   */
  async updateBusinessInformation(
    id: number,
    data: UpdateBusinessInformationDTO,
    imageFile?: File,
  ): Promise<ApiResponse<BusinessInformation>> {
    const formData = new FormData();

    if (data.title) formData.append("title", data.title);
    if (data.description) formData.append("description", data.description);
    if (imageFile) formData.append("image_url", imageFile);

    const response = await apiClient.put<ApiResponse<BusinessInformation>>(
      API_ROUTES.CMS.BUSINESS_INFO.UPDATE(id),
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
   * Remove uma informação de negócio
   */
  async deleteBusinessInformation(id: number): Promise<ApiResponse<void>> {
    const response = await apiClient.delete<ApiResponse<void>>(
      API_ROUTES.CMS.BUSINESS_INFO.DELETE(id),
    );
    return response.data;
  },
};
