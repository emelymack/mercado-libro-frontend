import PageContainer from "../Layout/PageContainer"
import { Box, Grid, GridItem, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useColorModeValue } from "@chakra-ui/react"
import { Title } from "../Title"
import { useEffect, useState } from "react";
import CartData from './CartData'
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import { useNavigate } from "react-router-dom";
import { toggleAccess } from "../../context/slices/checkoutSlice";
import { clearShippingData } from "../../context/slices/cartSlice";
import ShippingData from "./Form/ShippingData";
import { ICheckoutData, IPaymentData, IShippingData } from "../../types/checkout";
import PaymentData from "./Form/PaymentData";

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
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  // @ts-ignore
  const [ formData, setFormData ] = useState<ICheckoutData>(defaultValues)
  const [tabIndex, setTabIndex] = useState(0)


  const handleShippingData = (data: IShippingData) => {
    setFormData({...formData, shippingData: data})
    setTabIndex(1)
  }

  const handlePaymentData = (data: IPaymentData) => {
    console.log(data);
    
    // setFormData({...formData, paymentData: data})
    //* TODO: hacer POST a la api y enviar a la página de éxito 
  }

  useEffect(() => {
    if(!accessCheckout) navigate('/')

    return () => {
      if(accessCheckout) {
        dispatch(toggleAccess())
        dispatch(clearShippingData())
      }
    }
  }, [])
  
  

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
    </PageContainer>
  )
}

export default CheckoutPage