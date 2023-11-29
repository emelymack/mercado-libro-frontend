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
                <Table>
                    <Tbody>
                    <Tr>
                        <Td>mail@gmail.com</Td>
                    </Tr>
                    <Tr>
                        <Td>Direccion\n
                            CP 1234\n
                            Ciudad, Provincia - + 54911111111
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>Llega</Td>
                    </Tr>
                    <Tr>
                        <Td>yards</Td>
                    </Tr>
                    </Tbody>
                </Table>
                </TableContainer>
            </Container>
        </>
    )

}

export default SuccesfulPurchase;