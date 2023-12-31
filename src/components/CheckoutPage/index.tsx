import PageContainer from "../Layout/PageContainer"
import { Box, Grid, GridItem, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react"
import { Title } from "../Title"
import { useEffect, useState } from "react";
import CartData from './CartData'
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import { useNavigate } from "react-router-dom";
import { setCheckoutData, toggleAccess } from "../../context/slices/checkoutSlice";
import { clearCartData, clearShippingData } from "../../context/slices/cartSlice";
import ShippingData from "./Form/ShippingData";
import { ICheckoutData, IPaymentData, IShippingData } from "../../types/checkout";
import PaymentData from "./Form/PaymentData";
import { saveOrder } from "../../services/CheckoutService";
import CustomLoading from "../CustomLoading/CustomLoading";
import ModalError from "../Modal/ModalError";
import MercadoPago from "./MercadoPago";
import { calcSubtotal } from "../../utils/functions";

const defaultValues = {
  shippingData: {
    email: '',
    phoneNumber: '',
    street: '',
    streetNumber: 0,
    apartment: '',
    district: '',
    city: '',
    province: '',
    dniOrCuil: 0,
    shippingType: null,
    shippingPrice: 0
  },
  paymentData: {

  }
}

const CheckoutPage = () => {
  const accessCheckout = useAppSelector((state) => state.checkout.access)
  const cartData = useAppSelector((state) => state.cart)
  const userData = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  // @ts-ignore
  const [ formData, setFormData ] = useState<ICheckoutData>(defaultValues)
  const [tabIndex, setTabIndex] = useState(0)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ invoiceId, setInvoiceId ] = useState<null | string>(null)
  const [ preferenceId, setPreferenceId ] = useState<null | string>(null)
  const { isOpen: isOpenError, onOpen: onOpenError, onClose: onCloseError } = useDisclosure()
  const { isOpen: isOpenMP, onOpen: onOpenMP, onClose: onCloseMP } = useDisclosure()

  const handleShippingData = (data: IShippingData) => {
    setFormData({...formData, shippingData: data})    
    setTabIndex(1)
  }

  const handlePaymentData = (data: IPaymentData) => {
    setFormData({...formData, paymentData: data})
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if(!accessCheckout) navigate('/')    
  
    return () => {
      if(accessCheckout) {
        dispatch(toggleAccess())
        dispatch(clearShippingData())
      }
    }
  }, [])

  useEffect(() => {},[isLoading])
  
  useEffect(() => {
    if(Object.keys(formData.paymentData).length !== 0) {
      setIsLoading(true)
      try {
        dispatch(setCheckoutData({
          email: formData.shippingData.email,
          address: `${formData.shippingData.street} ${formData.shippingData.streetNumber}`,
          postalCode: cartData.shipping.postalCode,
          city: formData.shippingData.city,
          province: formData.shippingData.province,
          phoneNumber: formData.shippingData.phoneNumber,
          shippingType: formData.shippingData.shippingType,
          shippingDate: cartData.shipping.date,
          paymentType: formData.paymentData.paymentMethod,
        }))

        saveOrder({
          invoice: {
            address: {
              city: formData.shippingData.city,
              department: formData.shippingData.apartment,
              district: formData.shippingData.district,
              street: formData.shippingData.street,
              number: formData.shippingData.streetNumber,
              state: formData.shippingData.province,
              zipCode: String(cartData.shipping.postalCode)
            },
            date_created: new Date(),
            tax: 0.0,
            user_id: userData.id,
            deadline: cartData.shipping.date,
            document_type: formData.paymentData.documentType,
            dni: formData.paymentData.cardOwnerDocument,
            notes: formData.paymentData.orderNotes,
            paid: false,
            payment_method: formData.paymentData.paymentMethod,
            shipping: formData.shippingData.shippingPrice,
            shipping_method: formData.shippingData.shippingType,
            subTotal: calcSubtotal(cartData.items),
            total: cartData.total,
          },
          invoice_item: cartData.items.map((item) => ({
            book_id : item.product.id,
            quantity: item.quantity,
            unit_price: item.product.price,
          }))
        }).then((res) => {
          setIsLoading(false)
          setInvoiceId(res.data.invoice.id)
          setPreferenceId(res.data.invoice.preference_id)
          
          // setPreferenceId(res.data.preferenceI)
          if(res.status === 200) {
            if(formData.paymentData.paymentMethod !== 'MERCADO_PAGO') {
              dispatch(clearCartData())
              navigate('/successful')
            } else {
              onOpenMP()
            }
          } else {
            onOpenError()
          }
        })
      } catch (err) {
        console.error(err)
      }
    }
  }, [formData])

  if(isLoading) return <CustomLoading />

  return (
    <PageContainer>
      <Box mt={12} mb={20}> 
        <Title size="2xl" htmlElement={'h1'} text="Checkout" color="green" align="center" fw={800} />

        <Grid
          templateRows='repeat(1, 1fr)'
          templateColumns={{base: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)'}}
          gap={0}
          mt={5}
        >
          {/* Tabs formularios */}
          <GridItem colSpan={2}>
            <Tabs variant='soft-rounded' index={tabIndex}>
              {/* Tab navigation */}
              <TabList display={'flex'} alignItems={'center'}>
                <Tab _selected={{bg: 'brand.violetLogo25', color: useColorModeValue('brand.greenLogo', 'brand.violetLogo'), fontWeight: 700}}>Entrega</Tab>
                <Text mx={2} color={'gray.600'}>/</Text>
                <Tab _selected={{bg: 'brand.violetLogo25', color: useColorModeValue('brand.greenLogo', 'brand.violetLogo'), fontWeight: 700}}>Pago</Tab>
              </TabList>

              {/* Tab Panels */}
              <TabPanels>
                {/* Panel Entrega */}
                <TabPanel w={{base: '100%', lg: '90%'}}>
                  <ShippingData 
                    handleShippingData={handleShippingData}
                  />
                </TabPanel>


                {/* Panel Pago */}
                <TabPanel me={{base: 0, lg: 10}}>
                  <PaymentData 
                    handlePaymentData={handlePaymentData}
                    email={formData.shippingData.email}
                    address={ `${formData.shippingData.street} ${formData.shippingData.streetNumber}` }
                    city={formData.shippingData.city}
                    province={formData.shippingData.province}
                  />
                  <MercadoPago isOpenModalMP={isOpenMP} onCloseModalMP={onCloseMP} invoiceId={invoiceId} preferenceId={preferenceId} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </GridItem>

          
          {/* Resumen de compra */}
          <GridItem colSpan={1}>
            <CartData />
          </GridItem>
        </Grid>
      </Box>
      <ModalError onClose={onCloseError} isOpen={isOpenError} title="Hubo un error al realizar el pedido. Intente nuevamente, por favor." />
      
    </PageContainer>
  )
}

export default CheckoutPage