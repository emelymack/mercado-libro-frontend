import { Product } from "./product"

export interface Category {
  img: string,
  title: string
}

export interface CategoryDetail extends Category {
  products: Product[]
}