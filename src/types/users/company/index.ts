export interface Company {
  id?: number;
  cnpj: string;
  email: string;
  password: string;
  trade_name: string;
  role_id?: number;
  status?: number;
  created_at?: string;
  updated_at?: string;
}
