import { Product } from "./product"

export interface Category {
  img: string,
  title: string
}

export interface CategoryDetail extends Category {
  products: Product[]
}


export interface GetAllCategoryParams {
  page?: number;
  size?: number;
  orderDirection?: string;
  orderBy?: string;
  title?: string;
  author?: string;
  price?: number;
  status?: string;
  nameCategory?: string;
}