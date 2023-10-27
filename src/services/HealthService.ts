import { BASE_URL, HEALTH_URL } from "./apiUrls";
import httpService from "./httpService";

export interface TestItem {
  id: number;
  name: string;
}

export type TestResponse = TestItem[];

export const pingHealthCheck = (): Promise<string> => {
  return httpService
    .get(`${BASE_URL}${HEALTH_URL}ping`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response?.data?.message);
    });
};

export const getTestList = (): Promise<TestResponse> => {
  return httpService
    .get(`${BASE_URL}${HEALTH_URL}test`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response.data.message);
    });
};
