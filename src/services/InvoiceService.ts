import httpService from "./httpService";
import { BASE_URL, CREATE_INVOICE_URL, INVOICE_URL } from "./apiUrls";
import { Book } from "../types/product";
import { CustomResponse } from "../types/customResponse";
import axios from "axios";

export interface Invoice {
    id: string;
    dni:string;
    account_number: string;
    bank: string;
    date_created: string;
    tax: number;
    total: number;
    user_id: number;
    invoice_item: InvoiceItem[];
}

export interface InvoiceItem {
    id: number;
    book_id: number
    quantity: number;
    unit_price: number;
    total: number;
}

export interface GetParams {
    page?: number;
    size?: number;
}

export const getAllInvoices = async (
    params: GetParams
): Promise<CustomResponse<Invoice[]>> => {
    let url = `${BASE_URL}${INVOICE_URL}?`;

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
            url += `${key}=${value}&`;
        }
    });

    try {
        const response = await httpService.get(url);
        if (Array.isArray(response.data.content)) {
            return {
                statusCode: response.status,
                data: response.data.content as Invoice[],
                totalElements: response.data.totalElements,
            };
        } else {
            throw new Error("La respuesta no es un array de usuarios");
        }
    } catch (error) {
        console.log(error);
        
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
