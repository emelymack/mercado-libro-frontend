import httpService from "./httpService";
import {
  BASE_URL,
  CREATE_INVOICE_URL,
} from "./apiUrls";
import axios from "axios";
import { InvoiceData } from "../types/checkout";

export const saveOrder = async (data: InvoiceData): Promise<any> => {
  return httpService
    .post(`${BASE_URL}${CREATE_INVOICE_URL}`, data)
    .then((response) => response)
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