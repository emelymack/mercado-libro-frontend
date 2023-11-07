import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isLogged: boolean;
}

const initialState: AuthState = {
  isLogged: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isLogged = true;
    },
    logout(state) {
      state.isLogged = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
