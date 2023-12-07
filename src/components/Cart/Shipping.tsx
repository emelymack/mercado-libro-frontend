import { Box, Button, Flex, HStack, Input, Link, Radio, RadioGroup, Spinner, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import {useState, useEffect} from 'react'
import { useAppDispatch } from '../../context/hooks'
import { setShippingData } from '../../context/slices/cartSlice'


const Shipping = () => {
  const [results, setResults ] = useState({isLoading: false, isShown: false})
  const [shippingType, setShippingType] = useState<'CORREO_ARGENTINO'| 'PICK_UP' | null>('PICK_UP')
  const [ postalCode, setPostalCode ] = useState('')
  const [ displayError, setDisplayError ] = useState<'block' | 'none'>('none')
  const dispatch = useAppDispatch()

  const handleSearch = () => {
    if(postalCode.length >= 4 && postalCode.length <= 8) {
      setResults({isShown:false, isLoading: true})
      setDisplayError('none')
      dispatch(setShippingData({ type: shippingType, price: 0, postalCode: postalCode, date: shippingDate }))
      setTimeout(()=> {
        setResults({isLoading:false, isShown:true})
      }, 1500)
    } else {
      setResults({isShown:false, isLoading: false})
      setDisplayError('block')
    }
  }

  // Calcular fecha de envío (15 días)
  const today = new Date();
  today.setDate(today.getDate() + 15);
  const daysOfWeek = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const dayOfWeek = daysOfWeek[today.getDay()];
  const day = today.getDate();
  const month = today.getMonth() + 1; // Suma 1 porque en JavaScript los meses empiezan en 0 (
  const shippingDate = dayOfWeek + ' ' + (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month

  useEffect(()=> {
    console.log(postalCode);
    
    const price = shippingType === 'CORREO_ARGENTINO' ? 2800 : 0
    dispatch(setShippingData({ type: shippingType, price: price, postalCode: postalCode, date: shippingDate }))
  }, [shippingType])

  return (
    <Stack>
      <Box border={'1px solid'} borderColor={'gray.400'} borderRadius={'md'} py={5} px={4}>
        <Flex>
          <Box w={'100%'} me={3} >
            <Input placeholder='Código postal' size='md' onChange={(e) => setPostalCode(e.target.value)} color={useColorModeValue('brand.blueLogo','white')} _placeholder={{color: useColorModeValue('brand.blueLogo','white')}} />

            <Text display={displayError} fontSize={'small'} color={'red.500'}>Ingrese un código postal válido.</Text>

            <Link href='https://www.correoargentino.com.ar/formularios/cpa' isExternal fontSize='xs' color={'gray.500'} mt={1}>No sé mi código postal</Link>
          </Box>
          <Button variant={'brandSecondary'} borderColor={useColorModeValue('brand.greenLogo', 'white')} color={useColorModeValue('brand.greenLogo','white')} onClick={()=> handleSearch()}>ok</Button>
        </Flex>
        <Box mt={4} display={results.isLoading || results.isShown ? 'block' : 'none'}>
          {results.isLoading && <Flex justifyContent={'center'}><Spinner alignSelf={'center'} /></Flex>}
          {results.isShown && (
            <RadioGroup onChange={setShippingType} value={shippingType} display={'flex'} gap={5} flexDir={'column'}>
              <Radio size='lg' value='CORREO_ARGENTINO' name='shippingOptions' colorScheme='auto' bg='brand.greenLogo' borderColor={'brand.greenLogo'}>
                <Box ms={1}>
                  <HStack display={'flex'} justifyContent={'space-between'} w={'338px'}>
                    <Box fontSize={14} fontWeight={500}>
                      {/* Compañía de correo */}
                      Envío a domicilio
                    </Box>
                    <Box fontSize={'sm'} color={useColorModeValue('gray.700','whiteAlpha.700')}>
                      {/* Precio de envío */}
                      $2800
                    </Box>
                  </HStack>
                  <Text fontSize={'xs'} color={'gray.00'}>Llega el {shippingDate}</Text>
                </Box>
              </Radio>
              <Radio size='lg' value='PICK_UP' name='shippingOptions' colorScheme='auto' bg='brand.greenLogo' borderColor={'brand.greenLogo'} defaultChecked>
                <Box ms={1}>
                  <HStack display={'flex'} justifyContent={'space-between'} w={'338px'}>
                    <Box fontSize={14} fontWeight={500}>
                      Retiro por sucursal
                    </Box>
                    <Box fontSize={'sm'} color={useColorModeValue('gray.700','whiteAlpha.700')}>
                      {/* Precio de envío */}
                      Gratis
                    </Box>
                  </HStack>
                  <Text fontSize={'xs'} color={'gray.00'}>Av. Fantasía 111, Buenos Aires</Text>
                </Box>
              </Radio>
            </RadioGroup>
          ) 
        }
        </Box>
      </Box>
    </Stack>
  )
}

export default Shipping