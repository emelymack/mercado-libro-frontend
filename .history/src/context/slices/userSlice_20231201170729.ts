import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  lastName: string;
  id: string;
}

const initialState: UserState = {
  name: "",
  lastName: "",
  id: ''
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ name: string; lastName: string, id: string }>
    ) => {
      state.id = action.payload.id
      state.name = action.payload.name;
      state.lastName = action.payload.lastName;
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectName = (state: { user: UserState }) => state.user.name;
export const selectId = (state: { user: UserState }) => state.user.id;
export const selectUser = (state: { user: UserState }) => state.user;
export default userSlice.reducer;
