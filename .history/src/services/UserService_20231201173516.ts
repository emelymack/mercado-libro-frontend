import httpService from "./httpService";
import { BASE_URL, GET_ALL_USERS_URL, USER_URL } from "./apiUrls";
import { CustomResponse } from "../types/customResponse";
import axios from "axios";
import { AddAddress, Address, EditUser, GetAllUsersParams, User } from "../types/user";
import { Invoice } from "./InvoiceService";

export const getUserAddress = async (): Promise<CustomResponse<Address>> => {
  try {
    const response = await httpService.get(`${BASE_URL}api/address`);
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

const interceptor = axios.interceptors.request.use(
  (config) => {
    const tokenItem = localStorage.getItem("token");
    if (tokenItem) {
      const token = JSON.parse(tokenItem);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        config.headers.Authorization = "";
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const postUserAddress = async (
  address : AddAddress
): Promise<CustomResponse<Address>> => {
  try {
    axios.interceptors.request.use((config) => {
      const tokenItem = localStorage.getItem("token");
      if (tokenItem) {
        const token = JSON.parse(tokenItem);
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
      },
      (error) => Promise.reject(error)
    )

    const response = await httpService.post(`${BASE_URL}api/address`, address)

    axios.interceptors.request.eject(interceptor);
    console.log("Interceptor removed!")

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

export const getUserInvoices = async (
  id: string
): Promise<CustomResponse<Invoice[]>> => {
  try {
    console.log(id)
    const response = await httpService.get(`${BASE_URL}api/invoice/userid/${id}?page=0&size=10`);

    console.log(response)

    return {
      statusCode: response.status,
      data: response.data.content,
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

export const getAllUsers = async (
  params: GetAllUsersParams
): Promise<CustomResponse<User[]>> => {
  let url = `${BASE_URL}${GET_ALL_USERS_URL}?`;

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
        data: response.data.content as User[],
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
