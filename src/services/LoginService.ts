import httpService from "./httpService";
import { BASE_URL, LOGIN_URL } from "./apiUrls";
import { UserLogin } from "../types/userLogin";

import { CustomResponse } from "../types/customResponse";

export const loginUser = (
  userLogin: UserLogin
): Promise<CustomResponse<UserLogin>> => {
  return httpService
    .post(`${BASE_URL}${LOGIN_URL}`, userLogin)
    .then((response) => {
      return {
        statusCode: response.status,
        data: response.data,
      };
    })
    .catch((error) => {
      return {
        statusCode: error?.response?.status,
        data: null,
        errorMessage: error.message,
      };
    });
};
