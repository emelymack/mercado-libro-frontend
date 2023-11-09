import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import scrollReducer from '../context/slices/scrollSlice'

export const store = configureStore({
  reducer: {
    scroll: scrollReducer
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