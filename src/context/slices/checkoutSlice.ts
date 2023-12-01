import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CheckoutDataProps {
  email: string,
  address: string, 
  postalCode: number,
  city: string,
  province: string,
  phoneNumber: string,
  shippingDate?: string,
  shippingType: 'ENVIO_DOMICILIO' | 'RETIRO_SUCURSAL' | null,
  paymentType: string
}
interface Props {
  access: boolean,
  checkoutData: CheckoutDataProps
}

const emptyCheckoutData = {
  email: '',
  address: '', 
  postalCode: 0,
  city: '',
  province: '',
  phoneNumber: '',
  shippingDate: '',
  shippingType: null,
  paymentType: ''
} 

const initialState: Props = {
  access: false,
  checkoutData: emptyCheckoutData
}

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    toggleAccess: (state) => {
      state.access = !state.access
    },
    setCheckoutData: (state, action: PayloadAction<CheckoutDataProps>) => {
      state.checkoutData = action.payload
    },
    clearCheckoutData: (state) => {
      state.checkoutData = emptyCheckoutData
    }
  }
})

export const { toggleAccess, setCheckoutData, clearCheckoutData } = checkoutSlice.actions

export default checkoutSlice.reducer;