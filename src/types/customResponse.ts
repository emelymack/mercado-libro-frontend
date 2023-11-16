export interface CustomResponse<T> {
  statusCode: number;
  data: T | null;
  errorMessage?: string;
  totalPages?: number;
  totalElements?: number;
  currentPage?: number;
  pageSize?: number;
}
