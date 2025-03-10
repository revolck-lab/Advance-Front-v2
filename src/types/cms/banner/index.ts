import { TimeStamps } from "@/types/shared/common";

// Tipo para banner
export interface Banner extends TimeStamps {
  id: number;
  image_url: string;
  title: string;
  device: "Web" | "Mobile";
  url_link: string;
  author_id: number;
}

// Tipo para criação de banner
export interface CreateBannerDTO {
  title: string;
  url_link: string;
  device: "Web" | "Mobile";
  // O campo image_url será gerado após o upload
}

// Tipo para atualização de banner
export interface UpdateBannerDTO {
  title?: string;
  url_link?: string;
  device?: "Web" | "Mobile";
  // O campo image_url será atualizado após o upload, se necessário
}
