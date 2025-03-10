import { TimeStamps } from "@/types/shared/common";

// Tipo para informações de negócios
export interface BusinessInformation extends TimeStamps {
  id: number;
  title: string;
  description: string;
  image_url: string;
  author_id: number;
}

// Tipo para criação de informações de negócios
export interface CreateBusinessInformationDTO {
  title: string;
  description: string;
  // O campo image_url será gerado após o upload
}

// Tipo para atualização de informações de negócios
export interface UpdateBusinessInformationDTO {
  title?: string;
  description?: string;
  // O campo image_url será atualizado após o upload, se necessário
}
