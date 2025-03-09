import apiClient from "@/services/api-client";
import { Budget } from "@/types/budget";
import { ApiResponse } from "@/types/shared";

export const createBudget = async (data: Budget) => {
  const response = await apiClient.post<ApiResponse<{ id: number }>>(
    "/api/budget",
    data
  );
  return response.data;
};

export const listBudgets = async () => {
  const response = await apiClient.get<ApiResponse<Budget[]>>("/api/budget");
  return response.data;
};
