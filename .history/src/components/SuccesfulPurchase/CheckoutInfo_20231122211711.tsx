import { Heading, Image, Text, Table, Tr, Tbody, Td, Box, SimpleGrid } from "@chakra-ui/react";

const CheckoutInfo = () => {
 return (
        <Box borderWidth="2px" borderColor="brand.greenLogo" borderRadius="5px" w={{ base: '85vw', lg: '70vw', xl: '50vw' }}>
            <Table>
                <Tbody>
                    <Tr style={styles.row}>
                        <Td style={styles.rowContent} p={{ base: "14px", lg: "23px"}}>
                            <Box w={{ base: '35px', xl: '40px'}} h={{ base: '35px', xl: '40px'}} style={styles.icon}>
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
 )
};

export default CheckoutInfo;