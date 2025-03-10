import { TimeStamps } from "@/types/shared/common";

// Tipo para carrossel de empresas
export interface CarouselCompany extends TimeStamps {
  id: number;
  url: string;
  title: string;
  description?: string;
}

// Tipo para criação de carrossel de empresas
export interface CreateCarouselCompanyDTO {
  url: string;
  title: string;
  description?: string;
}

// Tipo para atualização de carrossel de empresas
export interface UpdateCarouselCompanyDTO {
  url?: string;
  title?: string;
  description?: string;
}
