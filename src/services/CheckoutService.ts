import httpService from "./httpService";
import {
  BASE_URL,
  CREATE_INVOICE_URL,
} from "./apiUrls";
import axios from "axios";
import { InvoiceData } from "../types/invoice";

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

export const ERROR_METHOD_NOT_ALLOWED = {
  error: 'METHOD_NOT_ALLOWED',
  message: "Method not allowed"
}

export const ERROR_CARD_WITHOUT_FUNDS = {
  error: 'CARD_WITHOUT_FUNDS',
  message: "The card doesn't have the require amount to do the transfer"
}

export const ERROR_CARD_WITHOUT_AUTHORIZATION = {
  error: 'CARD_WITHOUT_AUTHORIZATION',
  message: "The card cannot authorize the payment. Please call your bank before try again"
}

export const ERROR_CARD_DATA_INCORRECT = {
  error: 'CARD_DATA_INCORRECT',
  message: "The card data is not valid. Please review your data and submit it again"
}

export const ERROR_INCORRECT_ADDRESS = {
  error: 'INCORRECT_ADDRESS',
  message: "The address data is invalid. Please review your data and submit it again"
}

export const ERROR_SERVER = {
  error: 'SERVER_ERROR',
  message: "Server error. Please try again in a few seconds"
}