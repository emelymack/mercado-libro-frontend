import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Book } from "../../types/product";
import { getBookById } from "../../services/BookService";

interface Item {
  product: Book,
  quantity: number
}

interface Props {
  items: Item[],
  total: number,
  shipping: {
    type: 'ENVIO_DOMICILIO' | 'RETIRO_SUCURSAL' | null,
    price: number,
    postalCode: number
  }
}

// @ts-ignore
const initialState: Props = () => {
  if(localStorage.getItem('cart')) {  
    // @ts-ignore  
    return { items: JSON.parse(localStorage.getItem('cart')), total: 0, shipping: { type: null, price: 0, postalCode: 0 } }
  } 
  return { items: [], total: 0, shipping: { type: null, price: 0, postalCode: 0 } }
}

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
    },

    setShippingPrice: (state,action: PayloadAction<{price: number, type: "ENVIO_DOMICILIO" | "RETIRO_SUCURSAL", postalCode: number}>) => {      
      state.shipping = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchProduct.fulfilled, (state,action) => {
      state.items.push(action.payload)
    })
  }
});

export const { updateItem, deleteItem, setShippingPrice } = cartSlice.actions

export default cartSlice.reducer;
