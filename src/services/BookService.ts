import httpService from "./httpService";
import {
  BASE_URL,
  BOOK_URL,
  CREATE_BOOK_URL,
  GET_ALL_BOOK_URL,
} from "./apiUrls";

export interface Book {
  authors: string;
  categories: { id: number }[];
  currency_code: string;
  description: string;
  image_links: string[];
  isbn: string;
  language: string;
  page_count: number;
  price: number;
  published_date: string;
  publisher: string;
  ratings_count: number;
  stock: number;
  title: string;
}

export const getBookById = (id: number): Promise<Book> => {
  return httpService
    .get(`${BASE_URL}${BOOK_URL}/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response?.data?.message);
    });
};

export const updateBook = (id: number, book: Book): Promise<Book> => {
  return httpService
    .put(`${BASE_URL}${BOOK_URL}/${id}`, book)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response?.data?.message);
    });
};

export const deleteBook = (id: number): Promise<void> => {
  return httpService
    .delete(`${BASE_URL}${BOOK_URL}/${id}`)
    .then(() => {})
    .catch((error) => {
      throw new Error(error.response?.data?.message);
    });
};

export const patchBook = (
  id: number,
  bookUpdates: Partial<Book>
): Promise<Book> => {
  return httpService
    .patch(`${BASE_URL}${BOOK_URL}/${id}`, bookUpdates)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response?.data?.message);
    });
};

export const getAllBooks = (): Promise<Book[]> => {
  return httpService
    .get(`${BASE_URL}${GET_ALL_BOOK_URL}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response?.data?.message);
    });
};

export const getBooksByCategory = (category: string): Promise<Book[]> => {
  return httpService
    .get(`${BASE_URL}${GET_ALL_BOOK_URL}/${category}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response?.data?.message);
    });
};

export const saveBook = (book: Book): Promise<Book> => {
  return httpService
    .post(`${BASE_URL}${CREATE_BOOK_URL}`, book)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response?.data?.message);
    });
};
