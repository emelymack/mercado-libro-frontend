import { jwtDecode } from "jwt-decode";

export interface TokenData {
  exp?: number;
  iat?: number;
  sub?: string;
}

export const decodeToken = (): TokenData | null => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      return jwtDecode<TokenData>(token);
    } catch (error) {
      console.error("Error decoficando el token", error);
      return null;
    }
  }
  return null;
};
