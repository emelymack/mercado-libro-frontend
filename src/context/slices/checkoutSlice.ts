import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Props {
  access: boolean,
}

const initialState: Props = {
  access: false
}

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
  }
})

export const {  } = checkoutSlice.actions

export default checkoutSlice.reducer;