import { Heading, Container, Text, Table, TableContainer, Tr, Tbody, Td, Box } from "@chakra-ui/react";
import { useAppSelector } from "../../context/hooks";
import EmailIcon from "../../assets/icons/icon-email.svg";
import LocationIcon from "../../assets/icons/icon-location.svg";
import TruckIcon from "../../assets/icons/icon-truck.svg";
import CreditCardIcon from "../../assets/icons/icon-credit-card.svg";

const SuccesfulPurchase = () => {
    const isScrolling = useAppSelector((state) => state.scroll.isScrolling)

    return(
        <>
            <Container maxW="container.xl" bg="white.600" centerContent mb={20} className={`page ${isScrolling ? 'scroll' : ''}`}>
            <Box py={8} mb={20} display='flex' alignItems='center'>
                <Heading
                    size="lg"
                    fontSize="50px"
                    fontWeight='800'
                    mt={20}
                    mb={2}
                    color="brand.violetLogo"
                >
                    ¡PEDIDO REALIZADO EXITOSAMENTE!
                </Heading>
                <Text
                color='#003844'
                fontSize='30px'
                fontWeight='600'
                mb={10}
                mt={2}
                textAlign='center'
                >Toda la información del pedido y el envío fue enviada<br/>
                 a la casilla del correo electrónico indicado.</Text>

                <TableContainer border='2px solid' borderColor="#006C67" borderRadius='md' width='60vw'>
                <Table size='lg'>
                    <Tbody>
                    <Tr borderBottom="2px solid #006C67">
                        <Td style={{ display: "flex", alignItems: "center" }}>
                        <div
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            border: "2px solid #006C67",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: "15px",
                        }}>
                            <img src={EmailIcon} alt="Email icon" style={{ width: "25px"}} />
                        </div>
                            mail@gmail.com
                        </Td>
                    </Tr>
                    <Tr borderBottom="2px solid #006C67">
                        <Td style={{ display: "flex", alignItems: "revert" }}>
                        <div
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            border: "2px solid #006C67",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: "15px",
                        }}>
                            <img src={LocationIcon} alt="Location icon" style={{ width: "20px"}} />
                        </div>
                            Direccion<br/>
                            CP 1234<br/>
                            Ciudad, Provincia - + 54911111111
                        </Td>
                    </Tr>
                    <Tr borderBottom="2px solid #006C67">
                        <Td style={{ display: "flex", alignItems: "revert" }}>
                        <div
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            border: "2px solid #006C67",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: "15px",
                        }}>
                            <img src={TruckIcon} alt="Truck icon" style={{ width: "25px"}} />
                        </div>
                            Llega lunes 16/10<br/>
                            $2800 - Andreani Estandar "Envio a domicilio"
                        </Td>
                    </Tr>
                    <Tr>
                        <Td style={{ display: "flex", alignItems: "center" }}>
                        <div
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            border: "2px solid #006C67",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: "15px",
                        }}>
                            <img src={CreditCardIcon} alt="Credit card icon" style={{ width: "25px"}} />
                        </div>
                            Pago con tarjeta de debito/credito</Td>
                    </Tr>
                    </Tbody>
                </Table>
                </TableContainer>
                </Box>
            </Container>
        </>
    )

}


export default SuccesfulPurchase;