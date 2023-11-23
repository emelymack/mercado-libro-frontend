import { Heading, Image, Text, Table, TableContainer, Tr, Tbody, Td, Box, SimpleGrid } from "@chakra-ui/react";
import { useAppSelector } from "../../context/hooks";
import EmailIcon from "../../assets/icons/icon-email.svg";
import LocationIcon from "../../assets/icons/icon-location.svg";
import TruckIcon from "../../assets/icons/icon-truck.svg";
import CreditCardIcon from "../../assets/icons/icon-credit-card.svg";

const styles = {
    row: {
        borderBottom: "2px solid #006C67"
    },
    rowLineBreakContent: {
        display: "flex", 
        alignItems: "revert" 
    },
    rowContent: {
        display: "flex", 
        alignItems: "center" 
    },
    icon: {
        borderRadius: "50%",
        border: "2px solid #006C67",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: "15px",
    }
}

const SuccesfulPurchase = () => {
    const isScrolling = useAppSelector((state) => state.scroll.isScrolling)

    return(
        <>
            <SimpleGrid justifyItems='center' mb={60} className={`page ${isScrolling ? 'scroll' : ''}`}>
                <Heading
                    size={"lg"}
                    fontSize={{ base: '30px', lg: '40px'}}
                    fontWeight='800'
                    textAlign='center'
                    mt={20}
                    mb={2}
                    color="brand.violetLogo"
                >
                ¡PEDIDO REALIZADO EXITOSAMENTE!
                </Heading>
                <Box w={{ base: '75vw', md: '63vw', lg: '70vw', xl: '39vw' }}>
                    <Text
                    color='#003844'
                    fontSize={{ base: '20px', lg: '30px', xl: '25px'}}
                    fontWeight='600'
                    mb={10}
                    mt={2}
                    textAlign='center'
                    >Toda la información del pedido y el envío fue enviada
                    a la casilla del correo electrónico indicado.</Text>
                </Box>
            
                <Box borderWidth="2px" borderColor="brand.greenLogo" borderRadius="5px" w={{ base: '80vw', lg: '70vw', xl: '50vw' }}>
                <Table>
                    <Tbody>
                    <Tr style={styles.row}>
                        <Td style={styles.rowContent}>
                        <Box w={{ base: '40px'}} h={{ base: '40px'}}
                        style={styles.icon}>
                            <Image src={EmailIcon} alt="Email icon" w={{ base: '25px' }} />
                        </Box>
                            mail@gmail.com
                        </Td>
                    </Tr>
                    <Tr style={styles.row}>
                        <Td style={styles.rowLineBreakContent}>
                        <Box w={{ base: '40px'}} h={{ base: '40px'}} style={styles.icon}>
                            <Image src={LocationIcon} alt="Location icon" w={{ base: '20px' }} />
                        </Box>
                            Direccion<br/>
                            CP 1234<br/>
                            Ciudad, Provincia - + 54911111111
                        </Td>
                    </Tr>
                    <Tr style={styles.row}>
                        <Td style={styles.rowLineBreakContent}>
                        <Box w={{ base: '40px'}} h={{ base: '40px'}} style={styles.icon}>
                            <Image src={TruckIcon} alt="Truck icon" w={{ base: '26px' }} />
                        </Box>
                            Llega lunes 16/10<br/>
                            $2800 - Andreani Estandar "Envio a domicilio"
                        </Td>
                    </Tr>
                    <Tr>
                        <Td style={styles.rowContent}>
                        <Box w={{ base: '40px'}} h={{ base: '40px'}} style={styles.icon}>
                            <Image src={CreditCardIcon} alt="Credit card icon" w={{ base: '25px' }} />
                        </Box>
                            Pago con tarjeta de debito/credito</Td>
                    </Tr>
                    </Tbody>
                </Table>
                </Box>
            </SimpleGrid>
        </>
    )

}


export default SuccesfulPurchase;