export interface Product {
  id: number,
  img: string,
  title: string,
  author: string,
  price: number,
  url: string
}

export interface ProductDetail extends Product {
  pages: number,
  language: string,
  publishDate: Date,
}