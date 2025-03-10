import { TimeStamps } from "@/types/shared/common";

// Status possíveis de uma vaga
export enum VacancyStatus {
  ACTIVE = "active",
  CANCELED = "canceled",
  EXPIRED = "expired",
  UNDER_REVIEW = "under_review",
}

// Tipo para vaga
export interface Vacancy extends TimeStamps {
  id: number;
  title: string;
  requirements: string;
  activities: string;
  benefits?: string;
  notes?: string;
  start_date: string;
  end_date: string;
  status: VacancyStatus;
  company_id: number;
  area_id: number;
  city: string;
  state_id: string;
  published_date: string;
}

// Tipo para detalhes da vaga
export interface VacancyDetails extends Vacancy {
  company_name: string;
  area_name?: string;
  state_name?: string;
  applications_count?: number;
}

// Tipo para criação de vaga
export interface CreateVacancyDTO {
  title: string;
  requirements: string;
  activities: string;
  benefits?: string;
  notes?: string;
  start_date: string;
  end_date: string;
  company_id: number;
  area_id: number;
  city: string;
  state_id: string;
}

// Tipo para atualização de vaga
export interface UpdateVacancyDTO {
  title?: string;
  requirements?: string;
  activities?: string;
  benefits?: string;
  notes?: string;
  start_date?: string;
  end_date?: string;
  status?: VacancyStatus;
  area_id?: number;
  city?: string;
  state_id?: string;
}

// Tipo para filtros de vagas
export interface VacancyFilters {
  company_id?: number;
  area_id?: number;
  city?: string;
  state_id?: string;
  status?: VacancyStatus;
  created_at?: string;
}

// Tipo para área de trabalho
export interface Area {
  id: number;
  name: string;
}

// Tipo para candidatura
export interface Application {
  id: number;
  vacancy_id: number;
  user_id: number;
  application_date: string;
}

// Tipo para criação de candidatura
export interface CreateApplicationDTO {
  vacancy_id: number;
  user_id: number;
}
