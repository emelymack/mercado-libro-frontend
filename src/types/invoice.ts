export interface GetAllInvoincesParams {
  page?: number;
  size?: number;
}
export interface InvoiceData {
  invoice: Invoice,
  invoice_item: InvoiceItem[]
}

export interface Invoice {
  total: number,
  address: string,
  dni: number,
  document_type: string,
  notes?: string,
  user_id: number,
  date_created: Date,
  tax: number,
  deadline: string,
  payment_method: 'MERCADO_PAGO' | 'TRANSFER',
  paid: boolean
}
export interface InvoiceItem {
  book_id: number,
  quantity: number,
  unit_price: number
}