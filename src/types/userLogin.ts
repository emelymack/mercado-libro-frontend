import { Role, User } from "./user";

export interface UserLoginResponse {
  token: string;
  user: User;
  roles: Role[];
}
