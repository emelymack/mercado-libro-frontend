import httpService from "./httpService";
import { BASE_URL, LOGIN_URL } from "./apiUrls";
import { UserLoginResponse } from "../types/userLogin";
import { CustomResponse } from "../types/customResponse";
import axios from "axios";

export const loginUser = async (
  userLogin: UserLoginResponse
): Promise<CustomResponse<UserLoginResponse>> => {
  try {
    const response = await httpService.post(
      `${BASE_URL}${LOGIN_URL}`,
      userLogin
    );
    userLogin.token = response.data.token;
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
