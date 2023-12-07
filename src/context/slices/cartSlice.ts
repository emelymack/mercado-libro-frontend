import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CartItem } from "../../types/product";
import { getBookById } from "../../services/BookService";

interface ShippingProps {
  type: 'CORREO_ARGENTINO' | 'PICK_UP' | null,
  price: number,
  postalCode: number,
  date: string
}
interface Props {
  items: CartItem[],
  total: number,
  shipping: ShippingProps
}

const initialState: Props = { 
// @ts-ignore  
  items: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [], 
  total: 0, 
  shipping: { type: null, price: 0, postalCode: 0, date: '' },
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

    setShippingData: (state,action: PayloadAction<ShippingProps>) => {      
      state.shipping = action.payload
    },

    setTotalPrice: (state, action: PayloadAction<number>) => {
      state.total = action.payload
    },

    clearShippingData: (state) => {
      state.shipping = { type: null, price: 0, postalCode: 0, date: '' }
    },

    clearCartData: (state) => {
      localStorage.removeItem('cart')
      state.items = []
      state.shipping = { type: null, price: 0, postalCode: 0, date: '' },
      state.total = 0
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchProduct.fulfilled, (state,action) => {
      state.items.push(action.payload)
    })
  }
});

export const { updateItem, deleteItem, setShippingData, setTotalPrice, clearShippingData, clearCartData } = cartSlice.actions

export default cartSlice.reducer;
