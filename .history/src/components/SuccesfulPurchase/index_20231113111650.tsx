import { Heading, Container, Text, Table, TableContainer, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot } from "@chakra-ui/react";
import { useAppSelector } from "../../context/hooks";

const SuccesfulPurchase = () => {
    const isScrolling = useAppSelector((state) => state.scroll.isScrolling)

    return(
        <>
            <Container maxW="container.xl" bg="white.600" centerContent mb={20} className={`page ${isScrolling ? 'scroll' : ''}`}>
                <Heading
                    size="lg"
                    fontSize="50px"
                    mb={10}
                    mt={10}
                    color="brand.greenLogo"
                >
                    ¡Pedido realizado exitosamente!
                </Heading>
                <Text 
                color='#003844'
                fontSize='3xl' 
                fontStyle='Gabarito' 
                fontWeight='600px'
                lineHeight='67.5px'
                >(2xl) In love with React & Next</Text>

                <TableContainer>
                <Table size='lg' borderColor='#006C67' border='2px'>
                    <Tbody>
                    <Tr>
                        <Td>mail@gmail.com</Td>
                    </Tr>
                    <Tr>
                        <Td>Direccion<br/>
                            CP 1234<br/>
                            Ciudad, Provincia - + 54911111111
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>Llega lunes 16/10<br/>
                            $2800 - Andreani Estandar "Envio a domicilio"
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>Pago con tarjeta de debito/credito</Td>
                    </Tr>
                    </Tbody>
                </Table>
                </TableContainer>
            </Container>
        </>
    )

}

export default SuccesfulPurchase;