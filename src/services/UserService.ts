//generate user Service
import httpService from "./httpService";
import { BASE_URL, USER_URL } from "./apiUrls";
import { User } from "../types/user";
import { CustomResponse } from "../types/customResponse";
import axios from "axios";

export const getUserById = async (id: number): Promise<CustomResponse<User>> => {
  try {
    const response = await httpService.get(`${BASE_URL}${USER_URL}/${id}`);

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

export const updateUser = async (id: number, user: User): Promise<CustomResponse<User>> => {
  try {
    const response = await httpService.put(`${BASE_URL}${USER_URL}/${id}`, user);

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

export const patchUser = async (id: number, userUpdates: Partial<User>): Promise<CustomResponse<User>> => {
  try {
    const response = await httpService.patch(`${BASE_URL}${USER_URL}/${id}`, userUpdates);

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
    const response = await httpService.get(`${BASE_URL}${USER_URL}`);

    if (Array.isArray(response.data)) {
      return {
        statusCode: response.status,
        data: response.data as User[],
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

export const createUser = async (user: User): Promise<CustomResponse<User>> => {
  try {
    const response = await httpService.post(`${BASE_URL}${USER_URL}`, user);

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