import { Heading, Image, Text, Table, Tr, Tbody, Td, Box, SimpleGrid } from "@chakra-ui/react";
import { useAppSelector } from "../../context/hooks";
import EmailIcon from "../../assets/icons/icon-email.svg";
import LocationIcon from "../../assets/icons/icon-location.svg";
import TruckIcon from "../../assets/icons/icon-truck.svg";
import CreditCardIcon from "../../assets/icons/icon-credit-card.svg";

const styles = {
    row: {
        borderBottom: "2px solid brand.greenLogo"
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
        border: "2px solid brand.greenLogo",
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
            <SimpleGrid justifyItems='center' mb={40} className={`page ${isScrolling ? 'scroll' : ''}`}>
                <Heading
                    size={"lg"}
                    fontSize={{ base: '20px', sm: '26px', lg: '35px', xl: '40px'}}
                    fontWeight='800'
                    textAlign='center'
                    mt={20}
                    mb={2}
                    color="brand.violetLogo"
                >
                ¡PEDIDO REALIZADO EXITOSAMENTE!
                </Heading>
                <Box w={{ base: "75vw", sm: '80vw', md: '63vw', lg: '55vw', xl: '44vw' }}>
                    <Text
                    color='#003844'
                    fontSize={{ base: "12px", sm: '16px', lg: '20px', xl: '25px'}}
                    fontWeight='600'
                    mb={10}
                    mt={2}
                    textAlign='center'
                    >Toda la información del pedido y el envío fue enviada
                    a la casilla del correo electrónico indicado.</Text>
                </Box>
            
                <Box borderWidth="2px" borderColor="brand.greenLogo" borderRadius="5px" w={{ base: '85vw', lg: '70vw', xl: '50vw' }}>
                <Table>
                    <Tbody>
                    <Tr style={styles.row}>
                        <Td style={styles.rowContent} p={{ base: "14px", lg: "23px"}}>
                        <Box w={{ base: '35px', xl: '40px'}} h={{ base: '35px', xl: '40px'}}
                        style={styles.icon}>
                            <Image src={EmailIcon} alt="Email icon" w={{ base: '20px', xl: '25px' }} />
                        </Box>
                        <Text fontSize={{ base: "12px", xl: "16px"}}>
                            mail@gmail.com
                            </Text>
                        </Td>
                    </Tr>
                    <Tr style={styles.row}>
                        <Td style={styles.rowLineBreakContent} p={{ base: "14px", lg: "23px"}}>
                        <Box w={{ base: '35px', xl: '40px'}} h={{ base: '35px', xl: '40px'}} style={styles.icon}>
                            <Image src={LocationIcon} alt="Location icon" w={{ base: '15px', xl: '20px' }} />
                        </Box>
                        <Text fontSize={{ base: "12px", xl: "16px"}}>
                            Direccion<br/>
                            CP 1234<br/>
                            Ciudad, Provincia - + 54911111111
                            </Text>
                        </Td>
                    </Tr>
                    <Tr style={styles.row}>
                        <Td style={styles.rowLineBreakContent} p={{ base: "14px", lg: "23px"}}>
                        <Box w={{ base: '35px', xl: '40px'}} h={{ base: '35px', xl: '40px'}} style={styles.icon}>
                            <Image src={TruckIcon} alt="Location icon" w={{ base: '20px', xl: '25px' }} />
                        </Box>
                        <Text fontSize={{ base: "12px", xl: "16px"}}>
                            Llega lunes 16/10<br/>
                            $2800 - Andreani Estandar "Envio a domicilios"
                        </Text>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td style={styles.rowContent} p={{ base: "14px", lg: "23px"}}>
                        <Box w={{ base: '35px', xl: '40px'}} h={{ base: '35px', xl: '40px' }} style={styles.icon}>
                            <Image src={CreditCardIcon} alt="Credit card icon" w={{ base: '20px', xl: '25px' }} />
                        </Box>
                        <Text fontSize={{ base: "12px", xl: "16px"}}>
                            Pago con tarjeta de debito/credito
                        </Text>
                            </Td>
                    </Tr>
                    </Tbody>
                </Table>
                </Box>
            </SimpleGrid>
        </>
    )

}


export default SuccesfulPurchase;