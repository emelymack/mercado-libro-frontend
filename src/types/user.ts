export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  status: "ACTIVE" | "INACTIVE"; // Cambia según los posibles estados
  dateCreated: string; // Siempre es una cadena en formato ISO 8601
  roles: Role[];
}

export interface Role {
  id: number;
  description: string;
  status: "ACTIVE" | "INACTIVE"; // Cambia según los posibles estados
}
