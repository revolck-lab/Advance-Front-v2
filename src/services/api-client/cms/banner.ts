import apiClient from "@/services/api-client";
import { Banner } from "@/types/cms/banner";
import { ApiResponse } from "@/types/shared";

export const listBanners = async () => {
  const response = await apiClient.get<ApiResponse<Banner[]>>("/api/banner");
  return response.data;
};

export const createBanner = async (data: FormData) => {
  const response = await apiClient.post<ApiResponse<{ id: number }>>(
    "/api/banner",
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return response.data;
};
