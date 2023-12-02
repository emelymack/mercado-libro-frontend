import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";

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
      return produce(state, (draft) => {
        draft.id = action.payload.id;
        draft.name = action.payload.name;
        draft.lastName = action.payload.lastName;
      });
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectName = (state: { user: UserState }) => state.user.name;
export const selectUser = (state: { user: UserState }) => state.user;
export default userSlice.reducer;
