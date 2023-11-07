import httpService from "./httpService";
import { BASE_URL, GET_ALL_USERS_URL, USER_URL } from "./apiUrls";

import { CustomResponse } from "../types/customResponse";
import axios from "axios";
import { EditUser, User } from "../types/user";

export const getUserById = async (
  id: number
): Promise<CustomResponse<User>> => {
  try {
    const response = await httpService.get(`${BASE_URL}${USER_URL}${id}`);

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

export const updateUser = async (
  id: number,
  user: EditUser
): Promise<CustomResponse<EditUser>> => {
  try {
    const response = await httpService.put(`${BASE_URL}${USER_URL}${id}`, user);

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

export const deleteUser = async (id: number): Promise<CustomResponse<void>> => {
  try {
    const response = await httpService.delete(`${BASE_URL}${USER_URL}/${id}`);

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

export const patchUser = async (
  id: number,
  userUpdates: EditUser
): Promise<CustomResponse<EditUser>> => {
  try {
    const response = await httpService.patch(
      `${BASE_URL}${USER_URL}${id}`,
      userUpdates
    );

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

export const getAllUsers = async (): Promise<CustomResponse<User[]>> => {
  try {
    const response = await httpService.get(`${BASE_URL}${GET_ALL_USERS_URL}`);

    if (Array.isArray(response.data.content)) {
      return {
        statusCode: response.status,
        data: response.data.content as User[],
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