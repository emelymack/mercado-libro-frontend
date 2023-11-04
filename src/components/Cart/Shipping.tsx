import { Box, Button, Flex, HStack, Input, Radio, Spinner, Stack, Text } from '@chakra-ui/react'
import {useState, useRef} from 'react'
import { Link } from 'react-router-dom'

const Shipping = () => {
  const [results, setResults ] = useState({isLoading: false, isShown: false})
  const inputRef = useRef()

  const handleSearch = () => {
    if(inputRef.current.value.length >= 4) {
      setResults({isShown:false, isLoading: true})
      setTimeout(()=> {
        setResults({isLoading:false, isShown:true})
      }, 1500)
    } else {
      setResults({isShown:false, isLoading: false})
    }
  }

  // Calcular fecha de envío (15 días)
  const today = new Date();
  today.setDate(today.getDate() + 15);

  const daysOfWeek = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const dayOfWeek = daysOfWeek[today.getDay()];

  // Formatea la fecha en 'DD/MM'
  const day = today.getDate();
  const month = today.getMonth() + 1; // Suma 1 porque en JavaScript los meses empiezan en 0 (
  const shippingDate = dayOfWeek + ' ' + (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month

  return (
    <Stack>
      <Box border={'1px solid'} borderColor={'gray.400'} borderRadius={'md'} py={5} px={4}>
        <Flex>
          <Box w={'100%'} me={3} >
            <Input placeholder='Código postal' size='md' ref={inputRef}  />
            <Link href='https://www.correoargentino.com.ar/formularios/cpa' isExternal fontSize='xs' color={'gray.500'} mt={1}>No sé mi código postal</Link>
          </Box>
          <Button variant={'brandSecondary'} onClick={()=> handleSearch()}>ok</Button>
        </Flex>
        <Box mt={4} display={results.isLoading || results.isShown ? 'block' : 'none'}>
          {results.isLoading && <Flex justifyContent={'center'}><Spinner alignSelf={'center'} /></Flex>}
          {results.isShown && <Radio size='lg' name='1' colorScheme='auto' bg='brand.greenLogo' borderColor={'brand.greenLogo'} defaultChecked>
            <Box ms={1}>
              <HStack display={'flex'} justifyContent={'space-between'} w={'125%'}>
                <Box fontSize={14} fontWeight={500}>
                  {/* Compañía de correo */}
                  Andreani Estandar “Envío a domicilio”
                </Box>
                <Box fontSize={'sm'} color={'gray.600'}>
                  {/* Precio de envío */}
                  $2800
                </Box>
              </HStack>
              <Text fontSize={'xs'} color={'gray.00'}>Llega el {shippingDate}</Text>
            </Box>
          </Radio> }
        </Box>
      </Box>
    </Stack>
  )
}

export default Shipping