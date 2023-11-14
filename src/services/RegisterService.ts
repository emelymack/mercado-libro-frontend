import httpService from "./httpService";
import { BASE_URL, URL_REGISTER } from "./apiUrls";
import { RegisterUser } from "../types/registerUser";
import { CustomResponse } from "../types/customResponse";
import axios from "axios";

export const createUser = async (
  user: RegisterUser
): Promise<CustomResponse<RegisterUser>> => {
  try {
    const response = await httpService.post(`${BASE_URL}${URL_REGISTER}`, user);

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
