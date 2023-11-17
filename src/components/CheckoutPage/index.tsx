// import { useEffect } from "react"
// import { useAppSelector } from "../../context/hooks"
// import { useNavigate } from "react-router-dom"
import PageContainer from "../Layout/PageContainer"
import { Box, Grid, GridItem, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useBreakpointValue } from "@chakra-ui/react"
import { Title } from "../Title"
import CustomInput from "../Input/CustomInput"

import { useForm } from "react-hook-form";

const CheckoutPage = () => {
  // const accessCheckout = useAppSelector((state) => state.checkout.access)
  // const navigate = useNavigate()

  // useEffect(() => {
  //   if(!accessCheckout) navigate('/')
  // }, [])
  
  const { control, handleSubmit, reset, formState: { errors } } = useForm()

  const breakpointValue = useBreakpointValue({
    base: "base",
    sm: "sm",
    md: "md",
    lg: "lg",
  });

  return (
    <PageContainer>
      <Box my={20}> 
        <Title size="2xl" htmlElement={'h1'} text="Checkout" color="green" align="center" fw={800} />

        <Grid
          templateRows='repeat(1, 1fr)'
          templateColumns='repeat(3, 1fr)'
          gap={0}
          mt={5}
        >
          {/* Tabs formularios */}
          <GridItem colSpan={2}>
            {/* Tabs navigation */}
            <Tabs variant='soft-rounded' >
              <TabList display={'flex'} alignItems={'center'}>
                <Tab _selected={{bg: 'brand.violetLogo25', color: 'brand.greenLogo', fontWeight: 700}}>Entrega</Tab>
                <Text mx={2} color={'gray.600'}>/</Text>
                <Tab _selected={{bg: 'brand.violetLogo25', color: 'brand.greenLogo', fontWeight: 700}}>Pago</Tab>
              </TabList>
              <TabPanels>
                {/* Panel Entrega */}
                <TabPanel w={{base: '100%', lg: '90%'}}>
                  <Box mt={3}>
                    <Title size="md" capitalize htmlElement={'h5'} text="Datos de contacto" fw={700} />
                    <CustomInput name="email" placeholder={breakpointValue === "base" ? "Correo electrónico" : "Dirección de correo electrónico"} control={control} type="email" mt={2} />
                  </Box>
                </TabPanel>


                {/* Panel Pago */}
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </GridItem>

          
          {/* Resumen de compra */}
          <GridItem colSpan={1} bg='papayawhip' />
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default CheckoutPage