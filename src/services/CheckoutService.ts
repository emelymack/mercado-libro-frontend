import httpService from "./httpService";
import {
  BASE_URL,
  CREATE_INVOICE_URL,
} from "./apiUrls";
import axios from "axios";
import { Book } from "../types/product";

export const saveOrder = (book: Book): Promise<Book> => {
  return httpService
    .post(`${BASE_URL}${CREATE_INVOICE_URL}`, book)
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