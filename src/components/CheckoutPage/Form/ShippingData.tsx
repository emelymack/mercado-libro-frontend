import { useForm, SubmitHandler } from "react-hook-form";
import { IShippingData } from "../../../types/checkout"
import { zodResolver } from "@hookform/resolvers/zod";
import { shippingSchema } from "../schema";
import { Box, Button, Flex, Grid, GridItem, HStack, Radio, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import { Title } from "../../Title";
import CustomInput from "../../Input/CustomInput";
import { useAppSelector } from "../../../context/hooks";
import { formatPrice } from "../../Cart/PriceTag";

interface Props {
  handleShippingData: (data: IShippingData) => void,
  // savedData: IShippingData
}
const ShippingData = ({handleShippingData}: Props) => {
  const cartData = useAppSelector((state) => state.cart)
  const userData = useAppSelector((state) => state.user)
  const { control, formState: { errors }, handleSubmit } = useForm<IShippingData>({
    resolver: zodResolver(shippingSchema),
  });

  const breakpointValue = useBreakpointValue({
    base: "base",
    sm: "sm",
    md: "md",
    lg: "lg",
  });
  

  const onSubmit: SubmitHandler<IShippingData> = (data) => {
    // @ts-ignore
    handleShippingData({...data, shippingType: cartData.shipping.type, shippingPrice: cartData.shipping.price})
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Datos de contacto */}
      <Box mt={3}>
        <Title size="md" capitalize htmlElement={'h5'} text="Datos de contacto" fw={700} />
        <CustomInput 
          name="email" 
          placeholder={breakpointValue === "base" ? "Correo electrónico" : "Dirección de correo electrónico"} 
          control={control} 
          value={userData.email}
          type="email" 
          mt={2} 
        />
        {errors.email && (
          <Text fontSize="sm" color="red.400">
            {errors.email.message}
          </Text>
        )}
      </Box>

      {/* Entrega */}
      <Box mt={8}>
        <Title size="md" capitalize htmlElement={'h5'} text="Entrega" fw={700} />
        <Box mt={4} display={'flex'} flexDir={'column'} border={'2px solid'} borderColor={'brand.greenLogo'} borderRadius={8} py={5} px={6}>
          <Radio size='lg' value={cartData.shipping.type} name='shippingOptions' colorScheme='auto' bg='brand.greenLogo' borderColor={'brand.greenLogo'} isChecked>
            <Box ms={1}>
              <HStack display={'flex'} justifyContent={'space-between'} alignItems={"center"}>
                <Box fontWeight={500}>
                  { cartData.shipping.type === 'ENVIO_DOMICILIO' ? 'Envío a domicilio' : 'Retiro por sucursal' }
                </Box>
                <Box  color={useColorModeValue('gray.700','whiteAlpha.700')}>
                  { cartData.shipping.price > 0 ? formatPrice(cartData.shipping.price) : 'Gratis' }
                </Box>
              </HStack>
              <Text fontSize={'md'} color={'gray.00'}>{ cartData.shipping.type === 'ENVIO_DOMICILIO' ? `Llega el ${cartData.shipping.date}` : 'Av. Fantasía 111, Buenos Aires' }</Text>
            </Box>
          </Radio>
        </Box>
      </Box>

      {/* Datos del destinatario */}
      <Box mt={8}>
        <Title size="md" capitalize htmlElement={'h5'} text="Datos del destinatario" fw={700} />
        <CustomInput name="name" placeholder={"Nombre"} value={userData.name} control={control} type="text" mt={2} disabled />
        <CustomInput name="lastName" placeholder={"Apellido"} value={userData.lastName} control={control} type="text" mt={2} disabled />
        <CustomInput name="phoneNumber" placeholder={"Teléfono"} control={control} type="tel" mt={2} />
        {errors.phoneNumber && (
          <Text fontSize="sm" color="red.400">
            {errors.phoneNumber.message}
          </Text>
        )}
      </Box>

      {/* Domicilio del destinatario */}
      <Box mt={8}>
        <Title size="md" capitalize htmlElement={'h5'} text="Domicilio del destinatario" fw={700} />
        <CustomInput name="street" placeholder={"Calle"} control={control} type="text" mt={2} />
        {errors.street && (
          <Text fontSize="sm" color="red.400">
            {errors.street.message}
          </Text>
        )}
        <Grid
          templateColumns='repeat(2, 1fr)'
          gap={2}
        >
          <GridItem>
            <CustomInput name="streetNumber" placeholder={"Número"} control={control} type="number" mt={2} />
            {errors.streetNumber && (
              <Text fontSize="sm" color="red.400">
                {errors.streetNumber.message}
              </Text>
            )}
          </GridItem>
          <GridItem>
            <CustomInput name="apartment" placeholder={"Departamento (opcional)"} control={control} type="tel" mt={2} />
            {errors.apartment && (
              <Text fontSize="sm" color="red.400">
                {errors.apartment.message}
              </Text>
            )}
          </GridItem>
        </Grid>
        <CustomInput name="district" placeholder={"Barrio (opcional)"} control={control} type="text" mt={2} />
        {errors.district && (
          <Text fontSize="sm" color="red.400">
            {errors.district.message}
          </Text>
        )}
        <CustomInput name="city" placeholder={"Ciudad"} control={control} type="text" mt={2} />
        {errors.city && (
          <Text fontSize="sm" color="red.400">
            {errors.city.message}
          </Text>
        )}
        <Grid
          templateColumns='repeat(2, 1fr)'
          gap={2}
        >
          <GridItem>
            <CustomInput name="postalCode" placeholder={"Código Postal"} value={cartData.shipping.postalCode} control={control} type="text" mt={2} disabled />
          </GridItem>
          <GridItem>
            <CustomInput name="province" placeholder={"Provincia"} control={control} type="text" mt={2} />
            {errors.province && (
              <Text fontSize="sm" color="red.400">
                {errors.province.message}
              </Text>
            )}
          </GridItem>
        </Grid>
      </Box>

      {/* Datos de facturación */}
      <Box mt={8}>
        <Title size="md" capitalize htmlElement={'h5'} text="Datos de facturación" fw={700} />
        <CustomInput name="dniOrCuil" placeholder={"DNI o CUIL"} control={control} mt={2} maxLength={11} />
        {errors.dniOrCuil && (
          <Text fontSize="sm" color="red.400">
            {errors.dniOrCuil.message}
          </Text>
        )}
      </Box>

      {/* Submit */}
      <Flex justifyContent={"flex-end"} mt={10}>
        <Button variant='brandPrimary' py={6} px={7} fontSize={'xl'} _hover={{fontSize: 'xl', bg: 'brand.violetLogo'}} type="submit">Continuar</Button>
      </Flex>
    </form>
  )
}

export default ShippingData