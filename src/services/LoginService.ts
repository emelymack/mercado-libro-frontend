import httpService from "./httpService";
import { BASE_URL, LOGIN_URL } from "./apiUrls";
import { UserLogin } from "../types/userLogin";
import { User } from "../types/user";

export const loginUser = (userLogin: UserLogin): Promise<User> => {
  return httpService
    .post(`${BASE_URL}${LOGIN_URL}`, userLogin)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error?.message);
    });
};
