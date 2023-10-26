import axios, { CanceledError } from "axios";

export default axios.create({
  // TODO : Aca poner la url que queremos consumir
  baseURL: "https://jsonplaceholder.typicode.com",
});

export { CanceledError };
