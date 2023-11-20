export interface Product {
  id: string,
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

export interface Book {
  id: number;
  title: string;
  authors: Authors[];
  publisher: string;
  description: string;
  isbn: string;
  language: string;
  price: number;
  stock: number;
  categories: Category[];
  published_date: string;
  page_count: number;
  ratings_count: number;
  images: Image[];
  currency_code: string;
}

interface Category {
  id: number;
  name: string;
  status: string;
  description: string;
  image_link: string;
}

interface Image {
  id: number,
  url: string
}

export interface Authors {
  name: string;
  email: string;
}

export interface CartItem {
  product: Book,
  quantity: number
}