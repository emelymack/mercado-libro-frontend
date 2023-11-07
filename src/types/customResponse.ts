export interface CustomResponse<T> {
  statusCode: number;
  data: T | null;
  errorMessage?: string;
}
