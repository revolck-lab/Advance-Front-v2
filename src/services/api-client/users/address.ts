import apiClient from "@/services/api-client";
import { Address } from "@/types/users/address";

export const createAddress = async (data: Partial<Address>) => {
  const response = await apiClient.post<Address>("/api/users/address", data);
  return response.data;
};

export const getAddressById = async (id: number) => {
  const response = await apiClient.get<Address>(`/api/users/address/${id}`);
  return response.data;
};
