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

interface PropsFetchProduct {
  id: number,
  orderQty: number
}
export const fetchProduct = createAsyncThunk("cart/getProduct", async ({id,orderQty}: PropsFetchProduct) => {
  const book = await getBookById(id)
  return { product: book, quantity: orderQty }
})

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateItem: (state,action: PayloadAction<PropsFetchProduct>) => {
      state.items.map((item) => {
        if(item.product.id === action.payload.id) {
          item.quantity = action.payload.orderQty
        }
      })
    },

    deleteItem: (state,action: PayloadAction<{id:number}>) => {  
      state.items = state.items.filter((item) => item.product.id !== action.payload.id)
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchProduct.fulfilled, (state,action) => {
      console.log(action.payload);
      
      state.items.push(action.payload)
    })
  }
});

export const { updateItem, deleteItem } = cartSlice.actions

export default cartSlice.reducer;
