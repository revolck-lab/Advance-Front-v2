import { TimeStamps } from "@/types/shared/common";

// Tipo para configuração de SMTP
export interface SmtpConfig extends TimeStamps {
  id: number;
  smtp_host: string;
  smtp_port: number;
  smtp_username: string;
  smtp_password: string;
  author_id: number;
}

// Tipo para criação de configuração de SMTP
export interface CreateSmtpConfigDTO {
  smtp_host: string;
  smtp_port: number;
  smtp_username: string;
  smtp_password: string;
}

// Tipo para atualização de configuração de SMTP
export interface UpdateSmtpConfigDTO {
  smtp_host?: string;
  smtp_port?: number;
  smtp_username?: string;
  smtp_password?: string;
}

// Tipo para informações do site
export interface SiteInfo extends TimeStamps {
  id: number;
  favicon_url: string;
  site_name: string;
  author_id: number;
}

// Tipo para criação de informações do site
export interface CreateSiteInfoDTO {
  site_name: string;
  // O campo favicon_url será gerado após o upload
}

// Tipo para atualização de informações do site
export interface UpdateSiteInfoDTO {
  site_name?: string;
  // O campo favicon_url será atualizado após o upload, se necessário
}
