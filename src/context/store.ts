import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import scrollReducer from "../context/slices/scrollSlice";
import userReducer from "../context/slices/userSlice";
import authSlice from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    scroll: scrollReducer,
    user: userReducer,
    auth: authSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
