// Tipo para endereço completo
export interface Address {
  id: number;
  address: string;
  city: string;
  state_id: string;
  cep: string;
}

// Tipo para criação de endereço
export interface CreateAddressDTO {
  address: string;
  city: string;
  state: string;
  cep: string;
}

// Tipo para atualização de endereço
export interface UpdateAddressDTO {
  address?: string;
  city?: string;
  state_id?: string;
  cep?: string;
}
