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
  const { isOpen, onOpen, onClose } = useDisclosure()

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
    console.log(userData.id);
    
  
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
            date_created: new Date(),
            total: cartData.total,
            user_id: userData.id,
            address: `${formData.shippingData.street} ${formData.shippingData.streetNumber}`,
            document_type: formData.paymentData.documentType,
            dni: formData.paymentData.cardOwnerDocument,
            notes: formData.paymentData.orderNotes
          },
          invoice_item: cartData.items.map((item) => ({
            book_id : item.product.id,
            quantity: item.quantity,
            unit_price: item.product.price,
          }))
        }).then((res) => {
          setIsLoading(false)
          
          if(res.status === 200) {
            dispatch(clearCartData())
            navigate('/successful')
          } else {
            onOpen()
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
      <ModalError onClose={onClose} isOpen={isOpen} title="Hubo un error al realizar el pedido. Intente nuevamente, por favor." />
      
    </PageContainer>
  )
}

export default CheckoutPage