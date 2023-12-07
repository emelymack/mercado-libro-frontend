import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  lastName: string;
  id: number;
  email: string
}

const user = JSON.parse(localStorage.getItem('user'))

const initialState: UserState = {
  name: user?.name,
  lastName: user?.lastName,
  id: user?.id,
  email: user?.email
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<UserState>
    ) => {
      state.id = action.payload.id
      state.name = action.payload.name;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email
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
