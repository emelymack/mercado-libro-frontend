export interface Product {
  id: string,
  img: string,
  title: string,
  author: [],
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
  authors: [];
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
  image_links: string[];
  currency_code: string;
}

interface Category {
  id: number;
  name: string;
  status: string;
  description: string;
  image_link: string;
}

export interface Author {
  name: string;
  email: string;
}