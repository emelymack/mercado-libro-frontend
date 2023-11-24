import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  lastName: string;
  id: number;
}

const initialState: UserState = {
  name: "",
  lastName: "",
  id: 0
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ name: string; lastName: string, id: number }>
    ) => {
      state.id = action.payload.id
      state.name = action.payload.name;
      state.lastName = action.payload.lastName;
      state.id = action.payload.id
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectName = (state: { user: UserState }) => state.user.name;
export default userSlice.reducer;
