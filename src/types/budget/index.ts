export interface Budget {
  id?: number;
  service_id: number;
  first_name: string;
  last_name: string;
  company_name: string;
  position: string;
  email: string;
  address?: string;
  state_id: number;
  phone: string;
  city: string;
  postal_code?: string;
}
