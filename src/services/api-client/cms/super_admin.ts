import { apiClient } from "@/lib/axios-config";
import { API_ROUTES } from "@/constants/api-endpoints";
import {
  SmtpConfig,
  CreateSmtpConfigDTO,
  UpdateSmtpConfigDTO,
  SiteInfo,
  CreateSiteInfoDTO,
  UpdateSiteInfoDTO,
} from "@/types/cms/super_admin";
import { ApiResponse } from "@/types/shared/api-responses";

/**
 * Serviço para gerenciamento de configurações de Super Admin
 */
export const superAdminService = {
  /**
   * Obtém configuração SMTP
   */
  async getSmtpServer(id: number): Promise<ApiResponse<SmtpConfig>> {
    const response = await apiClient.get<ApiResponse<SmtpConfig>>(
      `${API_ROUTES.CMS.SUPER_ADMIN.SMTP}/${id}`,
    );
    return response.data;
  },

  /**
   * Cria uma nova configuração SMTP
   */
  async createSmtpServer(
    data: CreateSmtpConfigDTO,
  ): Promise<ApiResponse<SmtpConfig>> {
    const response = await apiClient.post<ApiResponse<SmtpConfig>>(
      API_ROUTES.CMS.SUPER_ADMIN.SMTP,
      data,
    );
    return response.data;
  },

  /**
   * Atualiza uma configuração SMTP existente
   */
  async updateSmtpServer(
    id: number,
    data: UpdateSmtpConfigDTO,
  ): Promise<ApiResponse<SmtpConfig>> {
    const response = await apiClient.put<ApiResponse<SmtpConfig>>(
      API_ROUTES.CMS.SUPER_ADMIN.SMTP_UPDATE(id),
      data,
    );
    return response.data;
  },

  /**
   * Obtém informações do site
   */
  async getSiteInformation(id: number): Promise<ApiResponse<SiteInfo>> {
    const response = await apiClient.get<ApiResponse<SiteInfo>>(
      API_ROUTES.CMS.SUPER_ADMIN.SITE_INFO(id),
    );
    return response.data;
  },

  /**
   * Cria novas informações do site
   * @param data Dados do site
   * @param faviconFile Arquivo de favicon
   */
  async createSiteInformation(
    data: CreateSiteInfoDTO,
    faviconFile: File,
  ): Promise<ApiResponse<SiteInfo>> {
    const formData = new FormData();
    formData.append("site_name", data.site_name);
    formData.append("favicon_url", faviconFile);

    const response = await apiClient.post<ApiResponse<SiteInfo>>(
      API_ROUTES.CMS.SUPER_ADMIN.SITE_INFO_CREATE,
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
   * Atualiza informações do site existentes
   */
  async updateSiteInformation(
    id: number,
    data: UpdateSiteInfoDTO,
    faviconFile?: File,
  ): Promise<ApiResponse<SiteInfo>> {
    const formData = new FormData();

    if (data.site_name) formData.append("site_name", data.site_name);
    if (faviconFile) formData.append("favicon_url", faviconFile);

    const response = await apiClient.put<ApiResponse<SiteInfo>>(
      API_ROUTES.CMS.SUPER_ADMIN.SITE_INFO_UPDATE(id),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  },
};
