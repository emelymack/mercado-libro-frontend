import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Book } from "../../types/product";
import { getBookById } from "../../services/BookService";

interface Item {
  product: Book,
  quantity: number
}

interface Props {
  items: Item[]
}
const initialState: Props = {
  items: []
};

export const fetchProduct = createAsyncThunk("cart/getProduct", async (id,orderQty, thunk)=> {
  const book = await getBookById(id)
  return { product: book, quantity: orderQty }
})

// export const fetchProductById = createAsyncThunk("cartItems/getBook", getBookById)

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addItem: (state, action: PayloadAction<AddItemProps>) => {
    //   console.log(action);
      
    // }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchProduct.fulfilled, (state,action) => {
      console.log(action.payload);
      
      // state.items.push(action.payload)
    })
  }
});

// export const { addItem } = cartSlice.actions

export default cartSlice.reducer;
