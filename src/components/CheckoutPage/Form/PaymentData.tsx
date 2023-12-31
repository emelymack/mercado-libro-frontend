import { zodResolver } from "@hookform/resolvers/zod";
import { IPaymentData } from "../../../types/checkout"
import { useForm, SubmitHandler } from "react-hook-form";
import { paymentSchema } from "../schema";
import { Box, Button, Divider, Flex, Image, Radio, RadioGroup, Text, Textarea } from "@chakra-ui/react";
import mailIcon from '../../../assets/icons/icon-mail.svg';
import locationIcon from '../../../assets/icons/icon-location.svg';
import shippingIcon from '../../../assets/icons/icon-shipping.svg';
import { Title } from "../../Title";
import { useState } from "react";
import { useAppSelector } from "../../../context/hooks";
// import PaymentCardData from "./PaymentCardData";


interface Props {
  handlePaymentData: (data: IPaymentData) => void,
  email: string,
  address: string,
  city: string,
  province: string,
}

const PaymentData = ({ handlePaymentData, email, address, city, province }: Props) => {
  const [paymentMethod, setPaymentMethod] = useState<'TRANSFER' | 'MERCADO_PAGO'>('MERCADO_PAGO')
  const cartData = useAppSelector((state) => state.cart)
  const { formState: { errors }, handleSubmit, register } = useForm<IPaymentData>({
    resolver: zodResolver(paymentSchema),
  });

  const onSubmit: SubmitHandler<IPaymentData> = (data) => {
    data = {...data, paymentMethod: paymentMethod}
    
    // if(data.paymentMethod === 'TARJETA' && !(data.cardNumber.startsWith('4') || data.cardNumber.startsWith('2') || data.cardNumber.startsWith('5') || data.cardNumber.startsWith('34') || data.cardNumber.startsWith('37') || data.cardNumber.startsWith('6011') || data.cardNumber.startsWith('622') || data.cardNumber.startsWith('644') || data.cardNumber.startsWith('649') || data.cardNumber.startsWith('65') || data.cardNumber.startsWith('300') || data.cardNumber.startsWith('305') || data.cardNumber.startsWith('36') || data.cardNumber.startsWith('38'))) {
    //   onOpen()
    // } else {
      handlePaymentData(data)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    // }
  }


  return (
    <>
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
          {cartData.shipping.type === 'CORREO_ARGENTINO' ? (
            <>
              Llega el {cartData.shipping.date}
              <br/>
              Envío a domicilio
            </>
          ) : 'Retiro por sucursal'}
        </Flex>
      </Box>

      <Box mt={10}>
        <Title size="md" capitalize htmlElement={'h5'} text="Notas de pedido" fw={700} />
        <Textarea {...register("orderNotes")} placeholder='Escribe aquí...' bg={'brand.violetLogo50'} color={'brand.blueLogo'} mt={3} rows={4} />
      </Box>

      <Box mt={10}>
        <Title size="md" capitalize htmlElement={'h5'} text="Seleccionar medio de pago" fw={700} />
        <RadioGroup 
          {...register("paymentMethod")} 
          onChange={(value) => { setPaymentMethod(value as 'TRANSFER' | 'MERCADO_PAGO')} }
          value={paymentMethod} 
          display={'flex'} 
          gap={3} 
          mt={4} 
          flexDir={'column'}
        >
          {/* <Radio size='lg' value='TARJETA' name='paymentMethod' colorScheme='auto' bg='brand.greenLogo' borderColor={'brand.greenLogo'} >
            Tarjeta de crédito o débito
          </Radio> */}
          <Radio size='lg' value='MERCADO_PAGO' name='paymentMethod' colorScheme='auto' bg='brand.greenLogo' borderColor={'brand.greenLogo'}>
            <Flex alignItems={'center'}>
              Mercado Pago
            </Flex>
          </Radio>
          
          <Radio size='lg' value='TRANSFER' name='paymentMethod' colorScheme='auto' bg='brand.greenLogo' borderColor={'brand.greenLogo'}>
            Transferencia o depósito bancario
          </Radio>
          

        </RadioGroup>
        {errors.paymentMethod && (
          <Text fontSize="sm" color="red.400">
            {errors.paymentMethod.message}
          </Text>
        )}
        {/* {paymentMethod === 'TARJETA' && (
          <PaymentCardData watch={watch} errors={errors} control={control} register={register} />
        )} */}
      </Box>

      <Flex justifyContent={"flex-end"} mt={10}>
        <Button 
        variant='brandPrimary' 
        py={6} 
        px={7} 
        fontSize={'xl'} 
        _hover={{fontSize: 'xl', bg: 'brand.violetLogo'}} 
        type="submit"
      >
        Realizar pedido
      </Button>
      </Flex>

    </form>
    {/* <ModalError isOpen={isOpen} onClose={onClose} title="Ingrese una tarjeta válida."  /> */}
    </>
  )
}

export default PaymentData