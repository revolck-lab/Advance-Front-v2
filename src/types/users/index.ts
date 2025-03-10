import { TimeStamps } from "@/types/shared/common";
import { RoleLevel } from "@/types/roles";

// Exportação de tipos de usuários
export * from "@/types/users/address";
export * from "@/types/users/company";

// Tipo para usuário
export interface User extends TimeStamps {
  id: number;
  name: string;
  email: string;
  cpf: string;
  phone_user: string;
  birth_date: string;
  gender_id: number;
  education_id: number;
  role_id: number;
  address_id: number;
  status: 0 | 1; // 0 = inativo, 1 = ativo
  code_user: string;
}

// Tipo para criação de usuário
export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone_user: string;
  birth_date: string;
  gender_id: number;
  education_id: number;
  role_id: number;
  address: string;
  city: string;
  state: string;
  cep: string;
}

// Tipo para atualização de usuário
export interface UpdateUserDTO {
  name?: string;
  email?: string;
  phone_user?: string;
  gender_id?: number;
  education_id?: number;
  address_id?: number;
  status?: 0 | 1;
}

// Tipo para gênero
export interface Gender {
  id: number;
  name: string;
}

// Tipo para nível de educação
export interface Education {
  id: number;
  name: string;
}

// Estados brasileiros
export interface State {
  id: number;
  name: string;
}
