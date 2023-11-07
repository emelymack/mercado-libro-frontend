import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  lastName: string;
}

const initialState: UserState = {
  name: "",
  lastName: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ name: string; lastName: string }>
    ) => {
      state.name = action.payload.name;
      state.lastName = action.payload.lastName;
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectName = (state: { user: UserState }) => state.user.name;
export default userSlice.reducer;
