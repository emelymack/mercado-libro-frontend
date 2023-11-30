import httpService from "./httpService";
import { BASE_URL } from "./apiUrls";
import { CustomResponse } from "../types/customResponse";
import axios from "axios";

export interface GetInvoiceResponse {
  content: Invoice[];
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface InvoiceItem {
  id: number;
  unit_price: number;
  quantity: number;
  total: number;
  invoice_id: string;
  book_id: number;
}

export interface Invoice {
  id: string;
  date_created: string;
  total: number;
  tax: number;
  bank: string;
  account_number: string;
  address: string;
  deadline: string;
  cardholder: string;
  expiration_date: string;
  dni: number;
  document_type: string;
  card_number: string;
  notes: string;
  user_id: number;
  client: string;
  invoice_item: InvoiceItem[]
  paid: boolean
}



export interface Response{
  code:string;
  message:string;
}

export const getInvoiceById = async (
    id: number
  ): Promise<CustomResponse<Invoice>> => {
    try {
      const response = await httpService.get(
        `${BASE_URL}api/invoice/${id}`);

      return {
        statusCode: response.status,
        data: response.data,
      };
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