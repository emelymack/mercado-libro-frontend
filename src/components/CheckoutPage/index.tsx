// import { useEffect } from "react"
// import { useAppSelector } from "../../context/hooks"
// import { useNavigate } from "react-router-dom"
import PageContainer from "../Layout/PageContainer"
import { Box, Button, Flex, Grid, GridItem, HStack, Radio, RadioGroup, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react"
import { Title } from "../Title"
import CustomInput from "../Input/CustomInput"

import { useForm } from "react-hook-form";
import { useState } from "react";

const CheckoutPage = () => {
  // const accessCheckout = useAppSelector((state) => state.checkout.access)
  // const navigate = useNavigate()

  // useEffect(() => {
  //   if(!accessCheckout) navigate('/')
  // }, [])
  
  const { control, handleSubmit, reset, formState: { errors } } = useForm()
  const [tabIndex, setTabIndex] = useState(0)

  const breakpointValue = useBreakpointValue({
    base: "base",
    sm: "sm",
    md: "md",
    lg: "lg",
  });

  return (
    <PageContainer>
      <Box mt={12} mb={20}> 
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
            <Tabs variant='soft-rounded' index={tabIndex}>
              <TabList display={'flex'} alignItems={'center'}>
                <Tab _selected={{bg: 'brand.violetLogo25', color: 'brand.greenLogo', fontWeight: 700}} onClick={() => setTabIndex(0)}>Entrega</Tab>
                <Text mx={2} color={'gray.600'}>/</Text>
                <Tab _selected={{bg: 'brand.violetLogo25', color: 'brand.greenLogo', fontWeight: 700}} onClick={() => setTabIndex(1)}>Pago</Tab>
              </TabList>
              <TabPanels>
                {/* Panel Entrega */}
                <TabPanel w={{base: '100%', lg: '90%'}}>
                  {/* Datos de contacto */}
                  <Box mt={3}>
                    <Title size="md" capitalize htmlElement={'h5'} text="Datos de contacto" fw={700} />
                    <CustomInput name="email" placeholder={breakpointValue === "base" ? "Correo electrónico" : "Dirección de correo electrónico"} control={control} type="email" mt={2} />
                  </Box>

                  {/* Entrega */}
                  <Box mt={8}>
                    <Title size="md" capitalize htmlElement={'h5'} text="Entrega" fw={700} />
                    <RadioGroup value={'ENVIO_DOMICILIO'} mt={4} display={'flex'} gap={5} flexDir={'column'} border={'1px solid'} borderColor={'gray.400'} borderRadius={8} p={5}>
                      <Radio size='lg' value='ENVIO_DOMICILIO' name='shippingOptions' colorScheme='auto' bg='brand.greenLogo' borderColor={'brand.greenLogo'}>
                        <Box ms={1}>
                          <HStack display={'flex'} justifyContent={'space-between'} alignItems={"center"} w={'100%'}>
                            <Box fontSize={14} fontWeight={500}>
                              Envío a domicilio
                            </Box>
                            <Box fontSize={'sm'} color={useColorModeValue('gray.700','whiteAlpha.700')}>
                              $2800
                            </Box>
                          </HStack>
                          {/* CAMBIAR FECHA!! */}
                          <Text fontSize={'xs'} color={'gray.00'}>Llega el lunes 16/10</Text>
                        </Box>
                      </Radio>
                    </RadioGroup>
                  </Box>

                  {/* Datos del destinatario */}
                  <Box mt={8}>
                    <Title size="md" capitalize htmlElement={'h5'} text="Datos del destinatario" fw={700} />
                    <CustomInput name="name" placeholder={"Nombre"} control={control} type="text" mt={2} />
                    <CustomInput name="lastName" placeholder={"Apellido"} control={control} type="text" mt={2} />
                    <CustomInput name="phoneNumber" placeholder={"Teléfono"} control={control} type="tel" mt={2} />
                  </Box>

                  {/* Domicilio del destinatario */}
                  <Box mt={8}>
                    <Title size="md" capitalize htmlElement={'h5'} text="Domicilio del destinatario" fw={700} />
                    <CustomInput name="street" placeholder={"Calle"} control={control} type="text" mt={2} />
                    <Grid
                      templateColumns='repeat(2, 1fr)'
                      gap={2}
                    >
                      <GridItem>
                        <CustomInput name="streetNumber" placeholder={"Número"} control={control} type="number" mt={2} />
                      </GridItem>
                      <GridItem>
                        <CustomInput name="apartment" placeholder={"Departamento (opcional)"} control={control} type="tel" mt={2} />
                      </GridItem>
                    </Grid>
                    <CustomInput name="district" placeholder={"Barrio (opcional)"} control={control} type="text" mt={2} />
                    <CustomInput name="city" placeholder={"Ciudad"} control={control} type="text" mt={2} />
                    <Grid
                      templateColumns='repeat(2, 1fr)'
                      gap={2}
                    >
                      <GridItem>
                        <CustomInput name="postalCode" placeholder={"Código Postal"} control={control} type="text" mt={2} disabled />
                      </GridItem>
                      <GridItem>
                        <CustomInput name="province" placeholder={"Provincia"} control={control} type="text" mt={2} />
                      </GridItem>
                    </Grid>
                  </Box>

                  {/* Datos de facturación */}
                  <Box mt={8}>
                    <Title size="md" capitalize htmlElement={'h5'} text="Datos de facturación" fw={700} />
                    <CustomInput name="dniOrCuil" placeholder={"DNI o CUIL"} control={control} type="number" mt={2} />
                  </Box>

                  <Flex justifyContent={"flex-end"} mt={10}>
                    <Button variant='brandPrimary' py={6} px={7} fontSize={'xl'} _hover={{fontSize: 'xl', bg: 'brand.violetLogo'}} onClick={()=>setTabIndex(1)}>Continuar</Button>
                  </Flex>
                  
                </TabPanel>


                {/* Panel Pago */}
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </GridItem>

          
          {/* Resumen de compra */}
          <GridItem colSpan={1} bg='papayawhip'>
            
          </GridItem>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default CheckoutPage