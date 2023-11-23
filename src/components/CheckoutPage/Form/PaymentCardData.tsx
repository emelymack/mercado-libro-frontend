import { Box, Grid, GridItem, Select, Text } from '@chakra-ui/react'
import Card from "./CreditCard";
import { useState } from 'react'
import CustomInput from '../../Input/CustomInput'

const PaymentCardData = ({watch, errors, control, register}: any) => {
  const [documentType, setDocumentType] = useState<'DNI'| 'CI' | null>(null)

  return (
    <Box mt={5} border={'2px solid'} borderColor={'brand.greenLogo'} borderRadius={8} p={5}>
      <Card watch={watch} />
      <CustomInput name="cardOwner" placeholder={"Titular de la tarjeta"} control={control} type="text" mt={4} />
      {errors.cardOwner && (
        <Text fontSize="sm" color="red.400">
          {errors.cardOwner.message}
        </Text>
      )}
      <CustomInput name="cardNumber" placeholder={"Número de tarjeta (sin espacios)"} control={control} type="text" mt={2} maxLength={16} />
      {errors.cardNumber && (
        <Text fontSize="sm" color="red.400">
          {errors.cardNumber.message}
        </Text>
      )}
      <Grid
        templateColumns='repeat(2, 1fr)'
        gap={2}
      >
        <GridItem>
          <CustomInput name="cardExpiryDate" placeholder={"Vencimiento (MM/AA)"} control={control} type="text" mt={2} />
          {errors.cardExpiryDate && (
            <Text fontSize="sm" color="red.400">
              {errors.cardExpiryDate.message}
            </Text>
          )}
        </GridItem>
        <GridItem>
          <CustomInput name="cardCVV" placeholder={"CVV"} control={control} type="number" mt={2} />
          {errors.cardCVV && (
            <Text fontSize="sm" color="red.400">
              {errors.cardCVV.message}
            </Text>
          )}
        </GridItem>
      </Grid>
      <Grid
        templateColumns='repeat(2, 1fr)'
        gap={2}
      >
        <GridItem>
          <Select
            {...register('documentType')} 
            onChange={(e) => { setDocumentType(e.target.value)}}
            value={documentType}  
            placeholder='Tipo de documento' 
            mt={2} 
            h={'55.6px'} 
            bg={'brand.violetLogo50'} 
            color={'brand.blueLogo'} 
            fontWeight={500} 
            fontSize={{ base: "lg", md: "xl" }}
          >
            <option value='DNI'>DNI</option>
            <option value='CI'>CI</option>
          </Select>
          {errors.documentType && (
            <Text fontSize="sm" color="red.400">
              {errors.documentType.message}
            </Text>
          )}
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
  )
}

export default PaymentCardData