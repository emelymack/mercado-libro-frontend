import apiClient from "./apiClient";

//TODO : Aca hacemos referencias a los params a la api
interface Entity {
  id: number;
}

class HttpService {
  ednpoint: string;

  constructor(endpoint: string) {
    this.ednpoint = endpoint;
  }
  getAll<T>() {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.ednpoint, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  delete(id: number) {
    return apiClient.delete(`${this.ednpoint}"/"${id}`);
  }

  create<T>(entity: T) {
    return apiClient.post(this.ednpoint, entity);
  }

  update<T extends Entity>(entity: T) {
    return apiClient.put(`${this.ednpoint}/${entity.id}`, entity);
  }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;
