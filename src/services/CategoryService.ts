
import httpService from "./httpService";
import {
  BASE_URL,
  CATEGORY_URL,
} from "./apiUrls";

export interface Category{
    id:number;
    name:string;
    status:string;
    description:string;
    image_link:string;
}

export const getAllCategories = (): Promise<Category[]> => {
    return httpService
      .get(`${BASE_URL}${CATEGORY_URL}`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          return response.data as Category[];
        } else {
          throw new Error("La respuesta no es un array de categorias");
        }
      })
      .catch((error) => {
        throw new Error(error.response?.data?.message);
      });
  };