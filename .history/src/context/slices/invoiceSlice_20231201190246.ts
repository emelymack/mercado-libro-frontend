import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InvoiceState {
  id: string;
}

const initialState: InvoiceState = {
  id: ""
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    setInvoice: (
      state,
      action: PayloadAction<{ id: string }>
    ) => {
      state.id = action.payload.id
    },
  },
});

export const { setInvoice } = invoiceSlice.actions;
export const selectId = (state: { invoice: InvoiceState }) => state.invoice.id;
export default invoiceSlice.reducer;
      
