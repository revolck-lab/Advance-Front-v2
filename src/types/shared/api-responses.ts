// Tipo genérico para respostas da API que retornam um único objeto
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

// Tipo genérico para respostas da API que retornam múltiplos objetos
export interface ApiListResponse<T> {
  data: T[];
  message?: string;
  total?: number;
  page?: number;
  totalPages?: number;
  limit?: number;
}

// Tipo para respostas de erros da API
export interface ApiErrorResponse {
  error: string;
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

// Tipo para respostas de acesso negado
export interface ForbiddenResponse {
  error: string;
  message: string;
  statusCode: 403;
}

// Tipo para respostas de autenticação requerida
export interface UnauthorizedResponse {
  error: string;
  message: string;
  statusCode: 401;
}
