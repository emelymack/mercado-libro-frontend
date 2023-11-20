// import { useEffect } from "react"
// import { useAppSelector } from "../../context/hooks"
// import { useNavigate } from "react-router-dom"
import PageContainer from "../Layout/PageContainer"
import { Box, Button, Divider, Flex, Grid, GridItem, HStack, Image, Radio, RadioGroup, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Textarea, useBreakpointValue, useColorModeValue } from "@chakra-ui/react"
import { Title } from "../Title"
import CustomInput from "../Input/CustomInput"

import { useForm } from "react-hook-form";
import { useState } from "react";

import mailIcon from '../../assets/icons/icon-mail.svg'
import locationIcon from '../../assets/icons/icon-location.svg'
import shippingIcon from '../../assets/icons/icon-shipping.svg'

const CheckoutPage = () => {
  // const accessCheckout = useAppSelector((state) => state.checkout.access)
  // const navigate = useNavigate()

  // useEffect(() => {
  //   if(!accessCheckout) navigate('/')
  // }, [])
  
  const { control, handleSubmit, reset, formState: { errors } } = useForm()
  const [tabIndex, setTabIndex] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState<'TARJETA'| 'TRANSFERENCIA' | 'MERCADO_PAGO' | null>(null)

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
                <Tab _selected={{bg: 'brand.violetLogo25', color: 'brand.greenLogo', fontWeight: 700}}>Entrega</Tab>
                <Text mx={2} color={'gray.600'}>/</Text>
                <Tab _selected={{bg: 'brand.violetLogo25', color: 'brand.greenLogo', fontWeight: 700}}>Pago</Tab>
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
                    <RadioGroup value={'ENVIO_DOMICILIO'} mt={4} display={'flex'} gap={5} flexDir={'column'} border={'2px solid'} borderColor={'brand.greenLogo'} borderRadius={8} py={5} px={6}>
                      <Radio size='lg' value='ENVIO_DOMICILIO' name='shippingOptions' colorScheme='auto' bg='brand.greenLogo' borderColor={'brand.greenLogo'}>
                        <Box ms={1}>
                          <HStack display={'flex'} justifyContent={'space-between'} alignItems={"center"}>
                            <Box fontWeight={500}>
                              Envío a domicilio
                            </Box>
                            <Box  color={useColorModeValue('gray.700','whiteAlpha.700')}>
                              $2800
                            </Box>
                          </HStack>
                          {/* CAMBIAR FECHA!! */}
                          <Text fontSize={'md'} color={'gray.00'}>Llega el lunes 16/10</Text>
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
                <TabPanel me={10}>
                  <Box border={'2px solid'} borderColor={'brand.greenLogo'} borderRadius={8}>
                    <Flex alignItems={"center"} p={5} fontSize={'lg'}>
                      <Image src={mailIcon} w={'40px'} h={'40px'} me={5} />
                      mail@gmail.com
                    </Flex>
                    <Divider borderWidth={'1px'} opacity={.75} />
                    <Flex alignItems={"center"} p={5} fontSize={'lg'}>
                      <Image src={locationIcon} w={'40px'} h={'40px'} me={5} />
                      Dirección <br/>
                      CP 1234 <br/>
                      Ciudad, Provincia - +54 111 1111
                    </Flex>
                    <Divider borderWidth={'1px'} opacity={.75} />
                    <Flex alignItems={"center"} p={5} fontSize={'lg'}>
                      <Image src={shippingIcon} w={'40px'} h={'40px'} me={5} />
                      Llega el lunes 16/10 <br/>
                      $2.800 - "Envío a domicilio"
                    </Flex>
                  </Box>

                  <Box mt={10}>
                    <Title size="md" capitalize htmlElement={'h5'} text="Medio de pago" fw={700} />
                    <RadioGroup onChange={setPaymentMethod} value={paymentMethod} display={'flex'} gap={3} mt={4} flexDir={'column'}>
                      <Radio size='lg' value='TARJETA' name='paymentMethod' colorScheme='auto' bg='brand.greenLogo' borderColor={'brand.greenLogo'} >
                        Tarjeta de crédito o débito
                      </Radio>
                      {paymentMethod === 'TARJETA' && (
                        <Box mb={3} border={'2px solid'} borderColor={'brand.greenLogo'} borderRadius={8} p={5}>
                          <CustomInput name="cardOwner" placeholder={"Titular de la tarjeta"} control={control} type="text" />
                          <Grid
                            templateColumns='repeat(2, 1fr)'
                            gap={2}
                          >
                            <GridItem>
                              <CustomInput name="cardExpirationDate" placeholder={"Vencimiento (MM/AA)"} control={control} type="text" mt={2} />
                            </GridItem>
                            <GridItem>
                              <CustomInput name="cardCVV" placeholder={"CVV"} control={control} type="number" mt={2} />
                            </GridItem>
                          </Grid>
                          <Grid
                            templateColumns='repeat(2, 1fr)'
                            gap={2}
                          >
                            <GridItem>
                              <Select placeholder='Tipo de documento' mt={2} h={'55.6px'} bg={'brand.violetLogo50'} color={'brand.blueLogo'} fontWeight={500} fontSize={{ base: "lg", md: "xl" }}>
                                <option value='DNI'>DNI</option>
                                <option value='CI'>CI</option>
                              </Select>
                            </GridItem>
                            <GridItem>
                              <CustomInput name="cardOwnerDocument" placeholder={"Documento del titular"} control={control} type="number" mt={2} />
                            </GridItem>
                          </Grid>
                        </Box>
                      )}
                      
                      <Radio size='lg' value='TRANSFERENCIA' name='paymentMethod' colorScheme='auto' bg='brand.greenLogo' borderColor={'brand.greenLogo'}>
                        Transferencia o depósito bancario
                      </Radio>
                      
                      <Radio size='lg' value='MERCADO_PAGO' name='paymentMethod' colorScheme='auto' bg='brand.greenLogo' borderColor={'brand.greenLogo'}>
                        Mercado Pago
                      </Radio>
                    </RadioGroup>
                  </Box>

                  <Box mt={10}>
                    <Title size="md" capitalize htmlElement={'h5'} text="Notas de pedido" fw={700} />
                    <Textarea placeholder='Escribe aquí...' bg={'brand.violetLogo50'} color={'brand.blueLogo'} mt={3} rows={4} />
                  </Box>

                  <Flex justifyContent={"flex-end"} mt={10}>
                    <Button variant='brandPrimary' py={6} px={7} fontSize={'xl'} _hover={{fontSize: 'xl', bg: 'brand.violetLogo'}} onClick={()=>setTabIndex(1)}>Realizar pedido</Button>
                  </Flex>
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