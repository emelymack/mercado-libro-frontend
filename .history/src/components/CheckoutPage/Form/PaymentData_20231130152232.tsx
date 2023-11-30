import { zodResolver } from "@hookform/resolvers/zod";
import { IPaymentData } from "../../../types/checkout"
import { useForm, SubmitHandler } from "react-hook-form";
import { paymentSchema } from "../schema";
import { Box, Button, Divider, Flex, Image, Radio, RadioGroup, Text, Textarea, useDisclosure } from "@chakra-ui/react";
import mailIcon from '../../../assets/icons/icon-mail.svg'
import locationIcon from '../../../assets/icons/icon-location.svg'
import shippingIcon from '../../../assets/icons/icon-shipping.svg'
import { Title } from "../../Title";
import { useState } from "react";
import { useAppSelector } from "../../../context/hooks";
import PaymentCardData from "./PaymentCardData";
import ModalError from "../../Modal/ModalError";
import { initMercadoPago } from '@mercadopago/sdk-react'
import { Payment } from '@mercadopago/sdk-react';


interface Props {
  handlePaymentData: (data: IPaymentData) => void,
  email: string,
  address: string,
  city: string,
  province: string,
  // savedData: IShippingData
}


  const customization = {
    paymentMethods: {
      creditCard: "all",
      debitCard: "all",
      mercadoPago: "all",
    },
  };
  const onSubmitMP = async (
    { selectedPaymentMethod, formData }
  ) => {
    console.log(formData);
    
    // callback llamado al hacer clic en el botón enviar datos
    return new Promise((resolve, reject) => {
      fetch("http://localhost:8080/v1/invoice/9224eeae-295f-44c3-aca6-ae811b8f0342/payment", {
        method: "POST",
        mode: 'no-cors',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((response) => {
          // recibir el resultado del pago
          resolve();
        })
        .catch((error) => {
          // manejar la respuesta de error al intentar crear el pago
          reject();
        });
    });
  };
  const onError = async (error) => {
    // callback llamado para todos los casos de error de Brick
    console.log(error);
  };
  const onReady = async () => {
    /*
      Callback llamado cuando el Brick está listo.
      Aquí puede ocultar cargamentos de su sitio, por ejemplo.
    */
  }

const PaymentData = ({ handlePaymentData, email, address, city, province }: Props) => {
  const [paymentMethod, setPaymentMethod] = useState<'TARJETA'| 'TRANSFERENCIA' | 'MERCADO_PAGO'>('MERCADO_PAGO')
  const cartData = useAppSelector((state) => state.cart)
  const { control, formState: { errors }, handleSubmit, register, watch } = useForm<IPaymentData>({
    resolver: zodResolver(paymentSchema),
  });
  const { onOpen, isOpen, onClose } = useDisclosure()

  initMercadoPago('TEST-7d04eb5c-5bb8-4696-a59e-533dfede69b9');

  const initialization = {
    amount: cartData.total,
    // preferenceId: "<PREFERENCE_ID>",
  };

  const onSubmit: SubmitHandler<IPaymentData> = (data) => {
    data = {...data, paymentMethod: paymentMethod}
    console.log(data);
    
    if(data.paymentMethod === 'TARJETA' && !(data.cardNumber.startsWith('4') || data.cardNumber.startsWith('2') || data.cardNumber.startsWith('5') || data.cardNumber.startsWith('34') || data.cardNumber.startsWith('37') || data.cardNumber.startsWith('6011') || data.cardNumber.startsWith('622') || data.cardNumber.startsWith('644') || data.cardNumber.startsWith('649') || data.cardNumber.startsWith('65') || data.cardNumber.startsWith('300') || data.cardNumber.startsWith('305') || data.cardNumber.startsWith('36') || data.cardNumber.startsWith('38'))) {
      onOpen()
    } else if(data.paymentMethod === 'MERCADO_PAGO') {
      
    } else {
      handlePaymentData(data)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
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
          {cartData.shipping.type === 'ENVIO_DOMICILIO' ? (
            <>
              Llega el {cartData.shipping.date}
              <br/>
              Envío a domicilio
            </>
          ) : 'Retiro por sucursal'}
        </Flex>
      </Box>

      <Box mt={10}>
        <Title size="md" capitalize htmlElement={'h5'} text="Seleccionar medio de pago" fw={700} />
        <RadioGroup 
          {...register("paymentMethod")} 
          onChange={(value) => { setPaymentMethod(value as 'TARJETA'| 'TRANSFERENCIA' | 'MERCADO_PAGO')} }
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
            Tarjeta de crédito o débito <Text ms={1} mt={1} fontSize={'xs'}>(a través de Mercado Pago)</Text>
            </Flex>
          </Radio>
          
          <Radio size='lg' value='TRANSFERENCIA' name='paymentMethod' colorScheme='auto' bg='brand.greenLogo' borderColor={'brand.greenLogo'}>
            Transferencia o depósito bancario
          </Radio>
          

        </RadioGroup>
        {errors.paymentMethod && (
          <Text fontSize="sm" color="red.400">
            {errors.paymentMethod.message}
          </Text>
        )}
        {paymentMethod === 'TARJETA' && (
          <PaymentCardData watch={watch} errors={errors} control={control} register={register} />
        )}
        {paymentMethod === 'MERCADO_PAGO' && (
          <Payment
            initialization={initialization}
            customization={customization}
            onSubmit={onSubmitMP}
            onReady={onReady}
            onError={onError}
          />
        )}
      </Box>

      <Box mt={10}>
        <Title size="md" capitalize htmlElement={'h5'} text="Notas de pedido" fw={700} />
        <Textarea {...register("orderNotes")} placeholder='Escribe aquí...' bg={'brand.violetLogo50'} color={'brand.blueLogo'} mt={3} rows={4} />
      </Box>

      <Flex justifyContent={"flex-end"} mt={10}>
        <Button 
        variant='brandPrimary' 
        py={6} 
        px={7} 
        fontSize={'xl'} 
        _hover={{fontSize: 'xl', bg: 'brand.violetLogo'}} 
        type="submit"
        // onClick={() => console.log(getValues())}
      >
        Realizar pedido
      </Button>
      </Flex>

    </form>
    <ModalError isOpen={isOpen} onClose={onClose} title="Ingrese una tarjeta válida."  />
    </>
  )
}

export default PaymentData