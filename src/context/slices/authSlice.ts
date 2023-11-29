import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isLogged: boolean;
  isAdmin?: boolean;
}

const initialState: AuthState = {
  isLogged: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAdmin(state) {
      state.isLogged = true;
      state.isAdmin = true;
    },
    login(state) {
      state.isLogged = true;
      state.isAdmin = false;
    },
    logout(state) {
      state.isLogged = false;
      state.isAdmin = false;
    },
  },
});

export const { login, logout, loginAdmin } = authSlice.actions;
export default authSlice.reducer;
