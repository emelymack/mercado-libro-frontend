import httpService from "./httpService";
import { BASE_URL, BOOK_URL } from "./apiUrls";
import { CustomResponse } from "../types/customResponse";
import axios from "axios";
import { GetAllBooksParams } from "../types/book";
import { Book } from "../types/product";

export const getAllBooksSearch = async (
  params: GetAllBooksParams
): Promise<CustomResponse<Book[]>> => {
  let url = `${BASE_URL}${BOOK_URL}?`;

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
        data: response.data.content as Book[],
        totalElements: response.data.totalElements,
      };
    } else {
      throw new Error("La respuesta no es un array de usuarios");
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
