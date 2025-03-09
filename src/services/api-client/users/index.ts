import apiClient from "@/services/api-client";
import { User } from "@/types/users";

export const getUserById = async (id: number) => {
  const response = await apiClient.get<User>(`/api/users/${id}`);
  return response.data;
};
