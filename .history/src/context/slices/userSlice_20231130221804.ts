import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  lastName: string;
  email: string;
  id: number;
}

const initialState: UserState = {
  name: "",
  lastName: "",
  email: "",
  id: 0
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ name: string; lastName: string, email: string, id: number }>
    ) => {
      state.id = action.payload.id
      state.name = action.payload.name;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectName = (state: { user: UserState }) => state.user.name;
export const selectUser = (state: { user: UserState }) => state.user;
export default userSlice.reducer;
