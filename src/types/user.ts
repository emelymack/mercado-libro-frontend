export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  status: "ACTIVE" | "INACTIVE";
  dateCreated: string;
  roles: Role[];
}

export interface EditUser {
  id?: number;
  name?: string;
  lastName?: string;
  email?: string;
  dateCreated?: string;
  status?: "ACTIVE" | "INACTIVE";
}

export interface Role {
  id?: number;
  description: string;
  status: "ACTIVE" | "INACTIVE";
}
