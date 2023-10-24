//  ? SHOULD : Este es un ejemplo de una interfaz de user que se puede usar para tipar los datos que se reciben de la API
import create from "./httpService";

export interface User {
  id: number;
  name: string;
}

export default create("/users");
