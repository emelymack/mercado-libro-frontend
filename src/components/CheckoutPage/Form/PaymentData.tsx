import { zodResolver } from "@hookform/resolvers/zod";
import { IPaymentData } from "../../../types/checkout"
import { useForm, SubmitHandler } from "react-hook-form";
import { paymentSchema } from "../schema";
import { Box, Button, Divider, Flex, Grid, GridItem, Image, Radio, RadioGroup, Select, Text, Textarea } from "@chakra-ui/react";
import mailIcon from '../../../assets/icons/icon-mail.svg'
import locationIcon from '../../../assets/icons/icon-location.svg'
import shippingIcon from '../../../assets/icons/icon-shipping.svg'
import { Title } from "../../Title";
import CustomInput from "../../Input/CustomInput";
import { useState } from "react";
import { useAppSelector } from "../../../context/hooks";

interface Props {
  handlePaymentData: (data: IPaymentData) => void,
  email: string,
  address: string,
  city: string,
  province: string,
  // savedData: IShippingData
}

const PaymentData = ({ handlePaymentData, email, address, city, province }: Props) => {
  const [paymentMethod, setPaymentMethod] = useState<'TARJETA'| 'TRANSFERENCIA' | 'MERCADO_PAGO' | null>(null)
  const cartData = useAppSelector((state) => state.cart)
  const { control, formState: { errors }, handleSubmit, register } = useForm<IPaymentData>({
    resolver: zodResolver(paymentSchema),
  });

  const onSubmit: SubmitHandler<IPaymentData> = (data) => {
    handlePaymentData(data)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box border={'2px solid'} borderColor={'brand.greenLogo'} borderRadius={8}>
        <Flex alignItems={"center"} p={5} fontSize={'lg'}>
          <Image src={mailIcon} w={'40px'} h={'40px'} me={5} />
          {email}
        </Flex>
        <Divider borderWidth={'1px'} opacity={.75} />
        <Flex alignItems={"center"} p={5} fontSize={'lg'}>
          <Image src={locationIcon} w={'40px'} h={'40px'} me={5} />
          {address} <br/>
          CP {cartData.shipping.postalCode} <br/>
          {city}, {province}
        </Flex>
        <Divider borderWidth={'1px'} opacity={.75} />
        <Flex alignItems={"center"} p={5} fontSize={'lg'}>
          <Image src={shippingIcon} w={'40px'} h={'40px'} me={5} />
          {cartData.shipping.type === 'ENVIO_DOMICILIO' && `Llega el ${cartData.shipping.date}`} <br/>
          {cartData.shipping.type === 'ENVIO_DOMICILIO' ? "Envío a domicilio" : 'Retiro por sucursal'}
        </Flex>
      </Box>

      <Box mt={10}>
        <Title size="md" capitalize htmlElement={'h5'} text="Medio de pago" fw={700} />
        <RadioGroup {...register("paymentMethod")} onChange={setPaymentMethod} value={paymentMethod} display={'flex'} gap={3} mt={4} flexDir={'column'}>
          <Radio size='lg' value='TARJETA' name='paymentMethod' colorScheme='auto' bg='brand.greenLogo' borderColor={'brand.greenLogo'} >
            Tarjeta de crédito o débito
          </Radio>
          {paymentMethod === 'TARJETA' && (
            <Box mb={3} border={'2px solid'} borderColor={'brand.greenLogo'} borderRadius={8} p={5}>
              <CustomInput name="cardOwner" placeholder={"Titular de la tarjeta"} control={control} type="text" />
              <CustomInput name="cardNumber" placeholder={"Número de tarjeta"} control={control} type="text" mt={2} />
              <Grid
                templateColumns='repeat(2, 1fr)'
                gap={2}
              >
                <GridItem>
                  <CustomInput name="cardExpiryDate" placeholder={"Vencimiento (MM/AA)"} control={control} type="text" mt={2} />
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
                  <Select {...register('documentType')} placeholder='Tipo de documento' mt={2} h={'55.6px'} bg={'brand.violetLogo50'} color={'brand.blueLogo'} fontWeight={500} fontSize={{ base: "lg", md: "xl" }}>
                    <option value='DNI'>DNI</option>
                    <option value='CI'>CI</option>
                  </Select>
                </GridItem>
                <GridItem>
                  <CustomInput name="cardOwnerDocument" placeholder={"Documento del titular"} control={control} type="number" mt={2} />
                  {errors.cardOwnerDocument && (
                    <Text fontSize="sm" color="red.400">
                      {errors.cardOwnerDocument.message}
                    </Text>
                  )}
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
        <Button variant='brandPrimary' py={6} px={7} fontSize={'xl'} _hover={{fontSize: 'xl', bg: 'brand.violetLogo'}} type="submit">Realizar pedido</Button>
      </Flex>
    </form>
  )
}

export default PaymentData