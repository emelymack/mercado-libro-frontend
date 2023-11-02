//generate user Service
import httpService from "./httpService";
import { BASE_URL, USER_URL } from "./apiUrls";
import { User } from "../types/user";
import { CustomResponse } from "../types/customResponse";

export const getUserById = (id: number): Promise<User> => {
  return httpService
    .get(`${BASE_URL}${USER_URL}/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response?.data?.message);
    });
};

export const updateUser = (id: number, user: User): Promise<User> => {
  return httpService
    .put(`${BASE_URL}${USER_URL}/${id}`, user)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response?.data?.message);
    });
};

export const deleteUser = (id: number): Promise<void> => {
  return httpService
    .delete(`${BASE_URL}${USER_URL}/${id}`)
    .then(() => {})
    .catch((error) => {
      throw new Error(error.response?.data?.message);
    });
};

export const patchUser = (
  id: number,
  userUpdates: Partial<User>
): Promise<User> => {
  return httpService
    .patch(`${BASE_URL}${USER_URL}/${id}`, userUpdates)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response?.data?.message);
    });
};

export const getAllUsers = (): Promise<User[]> => {
  return httpService
    .get(`${BASE_URL}${USER_URL}`)
    .then((response) => {
      if (Array.isArray(response.data)) {
        return response.data as User[];
      } else {
        throw new Error("La respuesta no es un array de usuarios");
      }
    })
    .catch((error) => {
      throw new Error(error.response?.data?.message);
    });
};

export const createUser = (user: User): Promise<CustomResponse<User>> => {
  return httpService
    .post(`${BASE_URL}${USER_URL}`, user)
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
