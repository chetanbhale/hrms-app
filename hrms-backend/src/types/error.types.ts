export interface AppError extends Error {
  statusCode?: number;
  code?: number;
  errors?: Record<string, { message: string }>;
}