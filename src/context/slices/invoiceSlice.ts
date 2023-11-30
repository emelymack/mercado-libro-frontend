import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedInvoiceId: null,
};

export const invoiceSlice = createSlice({
    name: "invoice",
    initialState,
    reducers: {
      selectInvoice: (state, action) => {
        state.selectedInvoiceId = action.payload;
      },
    },
  });

export const { selectInvoice } = invoiceSlice.actions;

export default invoiceSlice.reducer;  
      
