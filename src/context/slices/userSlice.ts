import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  lastName: string;
  id: number;
}

const user = JSON.parse(localStorage.getItem('user'))

const initialState: UserState = {
  name: user?.name,
  lastName: user?.lastName,
  id: user?.id
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
    },
    logoutUser:( state ) => {
      state.id = initialState.id,
      state.name = initialState.name,
      state.lastName = initialState.lastName
    }
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export const selectName = (state: { user: UserState }) => state.user.name;
export const selectUser = (state: { user: UserState }) => state.user;
export default userSlice.reducer;
