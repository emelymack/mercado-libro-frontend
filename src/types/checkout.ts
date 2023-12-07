export interface ICheckoutData {
  shippingData: IShippingData,
  paymentData: IPaymentData
}

export interface IShippingData {
  email: string,
  phoneNumber: string,
  street: string,
  streetNumber: number,
  apartment?: string,
  district?: string,
  city: string,
  province: string,
  dniOrCuil: number,
  shippingType: 'PICK_UP' | 'CORREO_ARGENTINO',
  shippingPrice: number
}

export interface IPaymentData {
  paymentMethod: 'MERCADO_PAGO' | 'TRANSFER',
  cardOwner: string,
  cardNumber:string,
  cardExpiryDate: string,
  cardCVV: number,
  documentType: string,
  cardOwnerDocument: number,
  orderNotes?: string
}