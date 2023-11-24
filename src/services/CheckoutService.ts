import httpService from "./httpService";
import {
  BASE_URL,
  CREATE_INVOICE_URL,
} from "./apiUrls";
import axios from "axios";
import { InvoiceData } from "../types/checkout";

export const saveOrder = (data: InvoiceData): Promise<any> => {
  const body = {
    invoice: {
      date_created: new Date(),
    }
  }
  return httpService
    .post(`${BASE_URL}${CREATE_INVOICE_URL}`, body)
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