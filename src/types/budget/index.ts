// Tipo para orçamento
export interface Budget {
  id: number;
  service_id: number;
  first_name: string;
  last_name: string;
  company_name: string;
  position: string;
  email: string;
  address: string;
  state_id: number;
  phone: string;
  city: string;
  postal_code: string;
}

// Tipo para criação de orçamento
export interface CreateBudgetDTO {
  service_id: number;
  first_name: string;
  last_name: string;
  company_name: string;
  position: string;
  email: string;
  address: string;
  state_id: number;
  phone: string;
  city: string;
  postal_code: string;
}

// Tipo para serviço
export interface Service {
  id: number;
  type: string;
}
