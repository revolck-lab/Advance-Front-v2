export * from "@/types/shared/api-responses";
export * from "@/types/shared/pagination";
export * from "@/types/shared/common";

// Tipos de estado de recursos
export enum ResourceStatus {
  PENDING = "pending",
  ACTIVE = "active",
  INACTIVE = "inactive",
  DELETED = "deleted",
  EXPIRED = "expired",
  CANCELED = "canceled",
  UNDER_REVIEW = "under_review",
}

// Tipos para erros de API
export interface ApiError {
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
  timestamp?: string;
  path?: string;
}
