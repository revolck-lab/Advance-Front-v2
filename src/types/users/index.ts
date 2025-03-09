export interface User {
  id: number;
  name: string;
  email: string;
  cpf: string;
  phone_user: string;
  gender_id: number;
  education_id: number;
  role_id: number;
  address_id?: number;
  code_user?: string;
  birth_date: string;
  status: number;
  created_at?: string;
  updated_at?: string;
}

export interface LoginRequest {
  login: string; // CPF or CNPJ
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone_user: string;
  gender_id: number;
  education_id: number;
  role_id: number;
  address: string;
  city: string;
  state: string;
  cep: string;
  birth_date: string;
}

export interface PasswordResetRequest {
  login: string;
}

export interface PasswordResetResponse {
  message: string;
  details?: { messageId: string; to: string };
}
