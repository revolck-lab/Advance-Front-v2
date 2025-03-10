// Parâmetros para solicitações paginadas
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// Resultado de paginação
export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Metadados de paginação
export interface PaginationMeta {
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}
