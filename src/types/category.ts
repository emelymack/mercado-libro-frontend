import { Product } from "./product";

export interface Category {
  img: string;
  title: string;
}

export interface CategoryDetail extends Category {
  products: Product[];
}

export interface GetAllCategoryParams {
  page?: number;
  size?: number;
  nameCategory?: string;
  keyword?: string;
  publisher?: string;
  releases?: boolean;
  selection?: string;
  sort?: string;
}
