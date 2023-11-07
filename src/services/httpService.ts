import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "";

interface RequestGeneric {
  get: (url: string) => Promise<AxiosResponse>;
  post: <T>(url: string, body: T) => Promise<AxiosResponse>;
  put: <T>(url: string, body: T) => Promise<AxiosResponse>;
  patch: <T>(url: string, body: T) => Promise<AxiosResponse>;
  delete: (url: string) => Promise<AxiosResponse>;
}

const requestGeneric: RequestGeneric = {
  get: (url) => axios.get(url),
  post: (url, body) => axios.post(url, body),
  put: (url, body) => axios.put(url, body),
  patch: (url, body) => axios.patch(url, body),
  delete: (url) => axios.delete(url),
};

axios.interceptors.request.use(
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

export default requestGeneric;
