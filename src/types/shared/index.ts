export interface ApiResponse<T> {
  message?: string;
  data?: T;
  error?: string;
  total?: number;
  totalPages?: number;
  page?: number;
}

export interface PaginationParams {
  limit?: number;
  offset?: number;
  page?: number;
}
