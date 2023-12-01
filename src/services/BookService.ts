import httpService from "./httpService";
import {
  BASE_URL,
  BOOK_URL,
  CREATE_BOOK_URL,
  GET_ALL_BOOK_URL,
  CATEGORY_URL,
  UPLOAD_IMAGEN_BOOK_URL
} from "./apiUrls";
import axios from "axios";
import { Book } from "../types/product";
import { GetAllCategoryParams } from "../types/category";
import { CustomResponse } from "../types/customResponse";
import { GetNewBooksParams } from "../types/book";

export interface GetBooksResponse {
  content: Book[];
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
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

export interface Response{
  code:string;
  message:string;
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
      if (Array.isArray(response.data.content)) {
        return response.data.content as Book[];
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
        return response.data as Category[];
      } else {
        throw new Error("La respuesta no es un array de Categorias");
      }
    })
    .catch((error) => {
      throw new Error(error.response?.data?.message);
    });
};

export const getBooksByCategory = (
  nameCategory: string,
  page: number
): Promise<GetBooksResponse> => {
  return httpService
    .get(`${BASE_URL}${BOOK_URL}?page=${page}&category=${nameCategory}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response?.data?.message);
    });
};

export const getByCategoryPage = async (
  params: GetAllCategoryParams,
): Promise<CustomResponse<Book[]>> => {
  let url = `${BASE_URL}${BOOK_URL}?page=${params.page}&category=${params.nameCategory}`;

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      url += `&${key}=${value}`;
    }
  });

  try {
    const response = await httpService.get(url);
    if (Array.isArray(response.data.content)) {
      return {
        statusCode: response.status,
        data: response.data.content as Book[],
        totalElements: response.data.totalElements,
      };
    } else {
      throw new Error("La respuesta no es un array de libros");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        statusCode: error.response ? error.response.status : 500,
        data: null,
        errorMessage: error.message,
      };
    } else {
      throw error;
    }
  }
};

export const saveBook = (book: Book): Promise<Book> => {
  return httpService
    .post(`${BASE_URL}${CREATE_BOOK_URL}`, book)
    .then((response) => response.data)
    .catch((error) => {
      if (axios.isAxiosError(error)) {        
        throw {
          statusCode: error.response ? error.response.status : 500,
          data: error.response ? error.response.data:null,
          errorMessage: error.message,
        };
      } else {
        throw error;
      }
    });
};

//http://localhost:8080/v1/api/book?selection=newer&page=0

/* export const getNewBooks = (
  page: number
): Promise<GetBooksResponse> => {
  return httpService
    .get(`${BASE_URL}${BOOK_URL}?selection=newer&page=${page}`) 
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response?.data?.message);
    });
}; */


export const getNewBooksPage = async (
  params: GetNewBooksParams,
): Promise<CustomResponse<Book[]>> => { 
  let url = `${BASE_URL}${BOOK_URL}?selection=newer&page=${params.page}`;
    
Object.entries(params).forEach(([key, value]) => {
  if (value !== undefined && value !== "") {
    url += `&${key}=${value}`;
  }
});

try {
  const response = await httpService.get(url);
  if (Array.isArray(response.data.content)) {
    return {
      statusCode: response.status,
      data: response.data.content as Book[],
      totalElements: response.data.totalElements,
    };
  } else {
    throw new Error("La respuesta no es un array de libros");
  }
} catch (error) {
  if (axios.isAxiosError(error)) {
    throw {
      statusCode: error.response ? error.response.status : 500,
      data: null,
      errorMessage: error.message,
    };
  } else {
    throw error;
  }
}
};

export const getNewBooksHome = (): Promise<GetBooksResponse> => {
  return httpService
    .get(`${BASE_URL}${BOOK_URL}?selection=newer&page=0`) 
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response?.data?.message);
    });
};

export const getNewBooksByCategory = (
  category: string
): Promise<GetBooksResponse> => {
  return httpService
    .get(`${BASE_URL}${BOOK_URL}?selection=newer&category=${category}&page=0`) 
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response?.data?.message);
    });
};

export const saveImage = (formdData: FormData, bookID:number): Promise<Response> => {
  return httpService
    .post(`${BASE_URL}${UPLOAD_IMAGEN_BOOK_URL}/${bookID}`, formdData)
    .then((response) => response.data)
    .catch((error) => {
      if (axios.isAxiosError(error)) {        
        throw {
          statusCode: error.response ? error.response.status : 500,
          data: error.response ? error.response.data:null,
          errorMessage: error.message,
        };
      } else {
        throw error;
      }
    });
};

export const deleteImage = (id: number): Promise<void> => {
  return httpService
    .delete(`${BASE_URL}${UPLOAD_IMAGEN_BOOK_URL}/${id}`)
    .then(() => {})
    .catch((error) => {
      throw new Error(error.response?.data?.message);
    });
};

