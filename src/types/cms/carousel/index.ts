import { TimeStamps } from "@/types/shared/common";

// Tipo para carrossel
export interface Carousel extends TimeStamps {
  id: number;
  url: string;
  title: string;
  description?: string;
}

// Tipo para criação de carrossel
export interface CreateCarouselDTO {
  url: string;
  title: string;
  description?: string;
}

// Tipo para atualização de carrossel
export interface UpdateCarouselDTO {
  url?: string;
  title?: string;
  description?: string;
}
