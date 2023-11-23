import { z } from "zod";

const phoneRegex = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)

export const shippingSchema = z.object({
  email: z
    .string({ 
      required_error: "Este campo es obligatorio." 
    })
    .email({ message: "Dirección de correo electrónico no válida" }),
  phoneNumber: z
    .string({ 
      required_error: "Este campo es obligatorio." 
    })
    .regex(phoneRegex, 'Número de teléfono no válido.'),
  street: z
    .string({ 
      required_error: "Este campo es obligatorio." 
    })
    .regex(/^[a-zA-Z\s]*$/, 'No se pueden ingresar valores numéricos ni símbolos.')
    .min(3, {message: 'Debe tener más de 3 caracteres.'})
    .max(35, {message: 'Máximo 35 caracteres.'}),
  streetNumber: z
    .string({ 
      required_error: "Este campo es obligatorio." 
    })
    .max(5, {message: 'Máximo 5 caracteres.'})
    .regex(/^[\d ]*$/, 'Ingresar valores numéricos.'),
  apartment: z
    .string()
    .max(5, {message: 'Máximo 5 caracteres.'})
    .optional(),
  district: z
    .string()
    .max(35, {message: 'Máximo 35 caracteres.'})
    .optional(),
  city: z
    .string({ 
      required_error: "Este campo es obligatorio." 
    })
    .regex(/^[a-zA-Z\s]*$/, 'No se pueden ingresar valores numéricos ni símbolos.')
    .min(3, {message: 'Debe tener más de 3 caracteres.'})
    .max(35, {message: 'Máximo 35 caracteres.'}),
  province: z
    .string({ 
      required_error: "Este campo es obligatorio." 
    })
    .regex(/^[a-zA-Z\s]*$/, 'No se pueden ingresar valores numéricos ni símbolos.')
    .min(3, 'Debe tener más de 3 caracteres.')
    .max(35, {message: 'Máximo 35 caracteres.'}),
  dniOrCuil: z
    .string({
      required_error: "Este campo es obligatorio." 
    })
    .min(8, {message: 'Debe tener un mínimo de 8 caracteres.'})
    .max(11, {message: 'Máximo 11 caracteres.'})
    .regex(/^[\d ]*$/, 'Ingresar valores numéricos.'),
})

export const paymentSchema = z.object({
  paymentMethod: z.string({
    invalid_type_error: "Debes seleccionar un medio de pago."
  })
  .nullable(), // arreglar por qué no envia el paymentMethod TRANSFERENCIA
  cardOwner: z
    .string()
    .regex(/^[a-zA-Z\s]*$/, 'No se pueden ingresar valores numéricos ni símbolos.')
    .min(3, {message: "Mínimo 3 caracteres"})
    .max(50, {message: "Máximo 50 caracteres"})
    .optional(),
  cardNumber: z
    .string()
    .min(15, {message: "El número de tarjeta debe tener 15 caracteres"})
    .max(19, {message: "El número de tarjeta debe tener 16 caracteres"})
    .regex(/^[\d ]*$/, 'Ingresar valores numéricos.')
    .optional(),
  cardExpiryDate: z
    .string()
    .min(5, {message: "Ingrese la fecha en formato MM/YY"})
    .max(5, {message: "Ingrese la fecha en formato MM/YY"})
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Ingresar fecha en formato MM/YY')
    .optional(),
  cardCVV: z
    .string()
    .min(3, { message: "El código de seguridad debe tener 3 caracteres." })
    .max(3, { message: "El código de seguridad debe tener 3 caracteres." })
    .regex(/^\d+$/, 'Ingresar valores numéricos.')
    .optional(),
  documentType: z.string()
  // .min(1, { message: "Este campo es obligatorio." })
  .optional(),
  cardOwnerDocument: z
    .string()
    .min(8, {message: 'Debe tener un mínimo de 8 caracteres.'})
    .max(11, {message: 'Máximo 11 caracteres.'})
    .regex(/^[\d ]*$/, 'Ingresar valores numéricos.')
    .optional(),
  orderNotes: z
    .string()
    .max(255, {message: 'Máximo 255 caracteres.'})
    .optional()
})
.refine((data) => data.paymentMethod !== undefined, {
  path: ["paymentMethod"],
  message: "Debes seleccionar un medio de pago.",
},)
.refine((data) => (data.paymentMethod === 'TARJETA' && data.cardNumber !== undefined) || data.paymentMethod !== 'TARJETA', {
  path: ["cardNumber"],
  message: "Este campo es obligatorio.",
},)
.refine((data) => (data.paymentMethod === 'TARJETA' && data.cardExpiryDate !== undefined) || data.paymentMethod !== 'TARJETA', {
  path: ["cardExpiryDate"],
  message: "Este campo es obligatorio.",
},)
.refine((data) => (data.paymentMethod === 'TARJETA' && data.cardCVV !== undefined) || data.paymentMethod !== 'TARJETA', {
  path: ["cardCVV"],
  message: "Este campo es obligatorio.",
},)
.refine((data) => (data.paymentMethod === 'TARJETA' && data.cardOwner !== undefined) || data.paymentMethod !== 'TARJETA', {
  path: ["cardOwner"],
  message: "Este campo es obligatorio.",
},)
.refine((data) => (data.paymentMethod === 'TARJETA' && data.cardOwnerDocument !== undefined) || data.paymentMethod !== 'TARJETA', {
  path: ["cardOwnerDocument"],
  message: "Este campo es obligatorio.",
},)
.refine((data) => (data.paymentMethod === 'TARJETA' && data.documentType !== "") || data.paymentMethod !== 'TARJETA', {
  path: ["documentType"],
  message: "Este campo es obligatorio.",
},);