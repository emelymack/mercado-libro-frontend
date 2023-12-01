import { Heading, Container, Text, Table, TableContainer, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot } from "@chakra-ui/react";
import { useAppSelector } from "../../context/hooks";
import EmailIcon from "../../assets/icons/icon-email.svg";

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

                <TableContainer border='3px solid' borderColor="#006C67" borderRadius='md' width='60vw'>
                <Table size='lg'>
                    <Tbody>
                    <Tr borderBottom="2px solid #006C67">
                        <Td style={{ display: "flex" }}>
                        <div
                        style={{
                            width: "35px",
                            height: "35px",
                            borderRadius: "50%",
                            border: "2px solid #006C67",
                            marginRight: "14px",
                        }}>
                            <img src={EmailIcon} alt="Email icon" style={{ marginRight: "14px", width: "30px"}} />
                        </div>
                            mail@gmail.com
                        </Td>
                    </Tr>
                    <Tr borderBottom="2px solid #006C67">
                        <Td>Direccion<br/>
                            CP 1234<br/>
                            Ciudad, Provincia - + 54911111111
                        </Td>
                    </Tr>
                    <Tr borderBottom="2px solid #006C67">
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