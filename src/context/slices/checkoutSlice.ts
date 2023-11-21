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
    toggleAccess: (state) => {
      state.access = !state.access
    }
  }
})

export const { toggleAccess } = checkoutSlice.actions

export default checkoutSlice.reducer;