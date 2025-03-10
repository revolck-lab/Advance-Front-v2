import { TimeStamps } from "@/types/shared/common";
import { ResourceStatus } from "@/types/shared/";

// Tipo para pacote de assinatura
export interface SignaturePackage extends TimeStamps {
  id: number;
  name: string;
  vacancy_limit: number;
  price: number;
  periodicity: "daily" | "weekly" | "monthly";
  featured: boolean;
}

// Tipo para criação de pacote de assinatura
export interface CreateSignaturePackageDTO {
  name: string;
  vacancy_limit: number;
  price: number;
  periodicity: "daily" | "weekly" | "monthly";
  featured: boolean;
}

// Tipo para atualização de pacote de assinatura
export interface UpdateSignaturePackageDTO {
  name?: string;
  vacancy_limit?: number;
  price?: number;
  periodicity?: "daily" | "weekly" | "monthly";
  featured?: boolean;
}

// Tipo para assinatura
export interface Signature extends TimeStamps {
  id: number;
  company_id: number;
  package_id: number;
  start_date: string;
  end_date?: string;
  status:
    | ResourceStatus.ACTIVE
    | ResourceStatus.CANCELED
    | ResourceStatus.EXPIRED;
  cancellation_date?: string;
}

// Tipo para criação de assinatura
export interface CreateSignatureDTO {
  company_id: number;
  package_id: number;
  start_date: string;
  status:
    | ResourceStatus.ACTIVE
    | ResourceStatus.CANCELED
    | ResourceStatus.EXPIRED;
}

// Tipo para atualização de assinatura
export interface UpdateSignatureDTO {
  package_id?: number;
  end_date?: string;
  status?:
    | ResourceStatus.ACTIVE
    | ResourceStatus.CANCELED
    | ResourceStatus.EXPIRED;
  cancellation_date?: string;
}

// Tipo para pagamento
export interface Payment {
  id: number;
  company_id: number;
  package_id: number;
  mp_preference_id: string;
  payment_id?: string;
  status: string;
  start_date: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}

// Tipo para criação de pagamento
export interface CreatePaymentDTO {
  company_id: number;
  package_id: number;
}

// Resposta da criação de pagamento
export interface PaymentResponse {
  init_point: string;
  paymentId: number;
}
