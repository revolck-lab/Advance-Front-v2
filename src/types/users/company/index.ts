import { TimeStamps } from "@/types/shared/common";

// Tipo para empresa
export interface Company extends TimeStamps {
  id: number;
  cnpj: string;
  trade_name: string; // Nome fantasia
  business_name: string; // Razão social
  contact_name: string;
  address_id: number;
  whatsapp: string;
  mobile_phone: string;
  landline_phone?: string;
  email: string;
  status: 0 | 1;
  role_id: number;
}

// Tipo para criação de empresa
export interface CreateCompanyDTO {
  cnpj: string;
  trade_name: string;
  business_name: string;
  contact_name: string;
  address: string;
  city: string;
  state: string;
  cep: string;
  whatsapp: string;
  mobile_phone: string;
  landline_phone?: string;
  email: string;
  password: string;
  role_id: number;
}

// Tipo para atualização de empresa
export interface UpdateCompanyDTO {
  trade_name?: string;
  business_name?: string;
  contact_name?: string;
  address_id?: number;
  whatsapp?: string;
  mobile_phone?: string;
  landline_phone?: string;
  email?: string;
  status?: 0 | 1;
}
