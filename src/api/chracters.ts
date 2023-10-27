import { instance } from "./apiBase";

const endpoint = "character";

export const characters = {
  getAll: function ({ page = 1 }: { page: number }) {
    return instance.get(endpoint, { params: { page } });
  },
};
