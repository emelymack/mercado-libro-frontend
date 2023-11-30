import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import scrollReducer from "../context/slices/scrollSlice";
import userReducer from "../context/slices/userSlice";
import authSlice from "./slices/authSlice";
import cartReducer from '../context/slices/cartSlice'
import checkoutReducer from '../context/slices/checkoutSlice'
import invoiceReducer from '../context/slices/invoiceSlice';

export const store = configureStore({
  reducer: {
    scroll: scrollReducer,
    user: userReducer,
    auth: authSlice,
    cart: cartReducer,
    checkout: checkoutReducer,
    invoice: invoiceReducer,
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
