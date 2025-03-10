import { apiClient } from "@/lib/axios-config";
import { API_ROUTES } from "@/constants/api-endpoints";
import {
  Address,
  CreateAddressDTO,
  UpdateAddressDTO,
} from "@/types/users/address";
import { ApiResponse } from "@/types/shared/api-responses";

/**
 * Serviço para gerenciamento de endereços de usuários
 */
export const addressService = {
  /**
   * Obtém o endereço do usuário
   */
  async getUserAddress(): Promise<ApiResponse<Address>> {
    const response = await apiClient.get<ApiResponse<Address>>(
      API_ROUTES.USERS.ADDRESS,
    );
    return response.data;
  },

  /**
   * Obtém um endereço específico por ID
   */
  async getAddressById(id: number): Promise<ApiResponse<Address>> {
    const response = await apiClient.get<ApiResponse<Address>>(
      `${API_ROUTES.USERS.ADDRESS}/${id}`,
    );
    return response.data;
  },

  /**
   * Cria um novo endereço
   */
  async createAddress(data: CreateAddressDTO): Promise<ApiResponse<Address>> {
    const response = await apiClient.post<ApiResponse<Address>>(
      API_ROUTES.USERS.ADDRESS,
      data,
    );
    return response.data;
  },

  /**
   * Atualiza um endereço existente
   */
  async updateAddress(
    id: number,
    data: UpdateAddressDTO,
  ): Promise<ApiResponse<Address>> {
    const response = await apiClient.put<ApiResponse<Address>>(
      `${API_ROUTES.USERS.ADDRESS}/${id}`,
      data,
    );
    return response.data;
  },

  /**
   * Verifica CEP via API externa
   * Este é um serviço auxiliar que poderia consumir APIs como ViaCEP
   */
  async checkCEP(cep: string): Promise<any> {
    // Remove caracteres não numéricos
    const cleanCEP = cep.replace(/\D/g, "");

    try {
      // Usando ViaCEP como exemplo
      const response = await fetch(
        `https://viacep.com.br/ws/${cleanCEP}/json/`,
      );
      const data = await response.json();

      if (data.erro) {
        throw new Error("CEP não encontrado");
      }

      return {
        cep: data.cep,
        address: data.logradouro,
        complement: data.complemento,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf,
      };
    } catch (error) {
      throw new Error("Erro ao verificar CEP");
    }
  },
};
