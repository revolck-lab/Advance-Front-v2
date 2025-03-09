export interface SmtpServer {
  id?: number;
  smtp_host: string;
  smtp_port: number;
  smtp_username: string;
  smtp_password: string;
  author_id: number;
}

export interface SiteInformation {
  id?: number;
  site_name: string;
  favicon_url: string;
  author_id: number;
}
