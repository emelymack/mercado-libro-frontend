import { Role, User } from "./user";


export interface UserLoginResponse {
  email: string;
  password: string;
  token?: string;
  user?: User | null;
  roles?: Role[];
}

