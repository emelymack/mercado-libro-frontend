import httpService from "./httpService";
import {
  BASE_URL,
  GET_ALL_INVOICES_URL,
  GET_BOOKS_BY_AUTHOR,
  GET_SALES_BY_CATEGORY_URL,
  GET_SALES_BY_PAYMENT_TYPE_URL,
} from "./apiUrls";
import { CustomResponse } from "../types/customResponse";
import axios from "axios";
import { GetAllInvoincesParams } from "../types/invoice";
import {
  BooksByAuthorData,
  PaymentTypeData,
  SalesData,
} from "../types/chatsData";

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
  subTotal: number;
  tax: number;
  bank: string;
  account_number: string;
  shipping_method: string;
  shipping: number;
  payment_method: string;
  deadline: string;
  cardholder: string;
  expiration_date: string;
  dni: number;
  document_type: string;
  card_number: string;
  notes: string;
  user_id: number;
  client: string;
  invoice_item: InvoiceItem[];
  paid: boolean;
  address: Address;
}

export interface Address {
  city: string;
  district: string;
  street: string;
  number: number;
  zipCode: string;
  state: string;
  department: string;
}

export interface Response {
  code: string;
  message: string;
}

export const getInvoiceById = async (
  id: string
): Promise<CustomResponse<Invoice>> => {
  try {
    const response = await httpService.get(`${BASE_URL}api/invoice/${id}`);

    console.log(response);
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

export const getAllInvoices = async (
  params: GetAllInvoincesParams
): Promise<CustomResponse<Invoice>> => {
  let url = `${BASE_URL}${GET_ALL_INVOICES_URL}?`;
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      url += `${key}=${value}&`;
    }
  });
  try {
    const response = await httpService.get(url);
    return {
      statusCode: response.status,
      data: response.data,
      totalElements: response.data.totalElements,
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

export const getSalesByCategory = async (
  params: GetAllInvoincesParams
): Promise<CustomResponse<SalesData[]>> => {
  let url = `${BASE_URL}${GET_SALES_BY_CATEGORY_URL}?`;
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      url += `${key}=${value}&`;
    }
  });
  try {
    const response = await httpService.get(url);
    return {
      statusCode: response.status,
      data: response.data.content as SalesData[],
      totalElements: response.data.totalElements,
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

export const getSalesCountByPayment = async (
  params: GetAllInvoincesParams
): Promise<CustomResponse<PaymentTypeData[]>> => {
  let url = `${BASE_URL}${GET_SALES_BY_PAYMENT_TYPE_URL}?`;
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      url += `${key}=${value}&`;
    }
  });
  try {
    const response = await httpService.get(url);
    return {
      statusCode: response.status,
      data: response.data.content as PaymentTypeData[],
      totalElements: response.data.totalElements,
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

export const getBooksByAuthor = async (
  params: GetAllInvoincesParams
): Promise<CustomResponse<BooksByAuthorData[]>> => {
  let url = `${BASE_URL}${GET_BOOKS_BY_AUTHOR}?`;
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      url += `${key}=${value}&`;
    }
  });
  try {
    const response = await httpService.get(url);
    return {
      statusCode: response.status,
      data: response.data.content as BooksByAuthorData[],
      totalElements: response.data.totalElements,
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
