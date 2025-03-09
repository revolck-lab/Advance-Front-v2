import apiClient from "@/services/api-client";
import { Vacancy } from "@/types/vacancies";
import { ApiResponse, PaginationParams } from "@/types/shared";

export const listVacancies = async (
  params: PaginationParams & { company_id?: number; created_at?: string }
) => {
  const response = await apiClient.get<ApiResponse<Vacancy[]>>("/api/vacancy", {
    params,
  });
  return response.data;
};

export const getVacancyDetails = async (id: number) => {
  const response = await apiClient.get<ApiResponse<Vacancy>>(
    `/api/vacancy/${id}`
  );
  return response.data;
};
