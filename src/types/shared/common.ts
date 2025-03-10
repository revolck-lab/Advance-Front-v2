// Informações de timestamps comuns
export interface TimeStamps {
  created_at: string;
  updated_at: string;
}

// Tipo para filtros dinâmicos
export type Filters = Record<
  string,
  string | number | boolean | null | undefined
>;

// Tipo para ordenação
export interface SortOptions {
  field: string;
  direction: "asc" | "desc";
}

// Tipo para upload de arquivos
export interface FileUpload {
  filename: string;
  mimetype: string;
  buffer: Buffer;
  originalname: string;
}

// Informação básica sobre um arquivo
export interface FileInfo {
  url: string;
  path?: string;
  filename?: string;
  size?: number;
  mimetype?: string;
}
