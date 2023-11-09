import { createSlice } from "@reduxjs/toolkit";

interface Props {
  isScrolling: boolean
}
const initialState: Props = {
  isScrolling: false
};

export const scrollSlice = createSlice({
  name: "scroll",
  initialState,
  reducers: {
    scrollPosition: (state,action) => {
      state.isScrolling = action.payload
    },
  },
});

export const { scrollPosition } = scrollSlice.actions

export default scrollSlice.reducer;