import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import scrollReducer from '../context/slices/scrollSlice'
import cartReducer from '../context/slices/cartSlice'

export const store = configureStore({
  reducer: {
    scroll: scrollReducer,
    cart: cartReducer
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
