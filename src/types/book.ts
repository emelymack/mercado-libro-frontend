export interface GetAllBooksParams {
  pageNumber?: number;
  pageSize?: number;
  keyword?: string;
  page?: number;
  size?: number;
}

export interface GetNewBooksParams {
  page?: number;
  size?: number;
  keyword?: string;
  publisher?: string;
  releases?: boolean;
  selection?: string;
  sort?: string;
}
