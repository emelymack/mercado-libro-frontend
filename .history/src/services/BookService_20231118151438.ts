import httpService from "./httpService";
import {
  BASE_URL,
  BOOK_URL,
  CREATE_BOOK_URL,
  GET_ALL_BOOK_URL,
  CATEGORY_URL
} from "./apiUrls";

export interface GetBooksResponse {
  content: Book[],
  currentPage: number,
  pageSize: number,
  totalElements: number,
  totalPages: number
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

interface Image {
  id: number;
  url: string;
}

export interface Authors {
  name: string;
  email: string;
}

export interface Category {
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
    .then((response) => {
      if (Array.isArray(response.data)) {
        return response.data as Book[];
      } else {
        throw new Error("La respuesta no es un array de libros");
      }
    })
    .catch((error) => {
      throw new Error(error.response?.data?.message);
    });
};

export const getAllCategory = (): Promise<Category[]> => {
  return httpService
    .get(`${BASE_URL}${CATEGORY_URL}`)
    .then((response) => {
      if (Array.isArray(response.data)) {
        console.log(response.data)
        return response.data as Category[];
      } else {
        throw new Error("La respuesta no es un array de Categorias");
      }
    })
    .catch((error) => {
      throw new Error(error.response?.data?.message);
    });
};

export const getBooksByCategory = (nameCategory: string): Promise<GetBooksResponse> => {
  return httpService
    .get(`${BASE_URL}${BOOK_URL}?page=0&category=${nameCategory}`) 
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

//http://localhost:8080/v1/api/book?selection=newer&page=0

export const getNewBooks = (): Promise<GetBooksResponse> => {
  return httpService
    .get(`${BASE_URL}${BOOK_URL}?releases=true&page=0`) 
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response?.data?.message);
    });
};

export const getNewBooksByCategory = (category:string): Promise<GetBooksResponse> => {
  return httpService
    .get(`${BASE_URL}${BOOK_URL}?selection=newer&category=${category}&page=0`) 
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response?.data?.message);
    });
};