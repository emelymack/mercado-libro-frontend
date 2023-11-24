import { Image, Text, Table, Tr, Tbody, Td, Box } from "@chakra-ui/react";
import EmailIcon from "../../assets/icons/icon-mail.svg";
import LocationIcon from "../../assets/icons/icon-location.svg";
import TruckIcon from "../../assets/icons/icon-shipping.svg";
import CreditCardIcon from "../../assets/icons/icon-credit-card.svg";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import { useEffect } from "react";
import { clearCheckoutData } from "../../context/slices/checkoutSlice";
import { useNavigate } from "react-router-dom";

const styles = {
    row: {
        borderBottom: "2px solid",
        borderColor: "#006C67"
    },
    rowLineBreakContent: {
        display: "flex", 
        alignItems: "revert",
    },
    rowContent: {
        display: "flex", 
        alignItems: "center" 
    },
    icon: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: "15px",
    }
}

const CheckoutInfo = () => {
    const checkoutData = useAppSelector((state) => state.checkout.checkoutData)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(checkoutData.shippingType === null) navigate('/')
        
        return () => {
            dispatch(clearCheckoutData())
        }
    }, [])
 return (
        <Box borderWidth="2px" borderColor="brand.greenLogo" borderRadius={10} w={{ base: '85vw', lg: '70vw', xl: '50vw' }}>
            <Table>
                <Tbody>
                    <Tr style={styles.row}>
                        <Td style={styles.rowContent}>
                            <Box w={{ base: '35px', xl: '40px'}} h={{ base: '35px', xl: '40px'}} style={styles.icon}>
                                <Image src={EmailIcon} alt="Email icon" w={{ base: '20px', xl: '35px' }} />
                            </Box>
                            <Text>
                                {checkoutData.email}
                            </Text>
                        </Td>
                    </Tr>
                    <Tr style={styles.row}>
                        <Td style={styles.rowLineBreakContent}>
                            <Box w={{ base: '35px', xl: '40px'}} h={{ base: '35px', xl: '40px'}} style={styles.icon}>
                                <Image src={LocationIcon} alt="Location icon" w={{ base: '15px', xl: '35px' }} />
                            </Box>
                            <Text>
                                {checkoutData.address}<br/>
                                CP {checkoutData.postalCode}<br/>
                                {checkoutData.city}, {checkoutData.province} - +{checkoutData.phoneNumber}
                            </Text>
                        </Td>
                    </Tr>
                    <Tr style={styles.row}>
                        <Td style={styles.rowLineBreakContent}>
                            <Box w={{ base: '35px', xl: '40px'}} h={{ base: '35px', xl: '40px'}} style={styles.icon}>
                                <Image src={TruckIcon} alt="Location icon" w={{ base: '20px', xl: '35px' }} />
                            </Box>
                            <Text>
                                { checkoutData.shippingType === 'ENVIO_DOMICILIO' ? (
                                    <>
                                    Envío a domicilio<br/>
                                    Llega el {checkoutData.shippingDate}
                                    </>
                                ) : (
                                    <>
                                    Retiro por sucursal<br/>
                                    <Text fontSize={'sm'}>Av. Fantasía 111, Buenos Aires</Text>
                                    </> 
                                ) }
                                
                            </Text>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td style={styles.rowContent}>
                            <Box w={{ base: '35px', xl: '40px'}} h={{ base: '35px', xl: '40px' }} style={styles.icon}>
                                <Image src={CreditCardIcon} alt="Credit card icon" w={{ base: '20px', xl: '35px' }} />
                            </Box>
                            <Text>
                                { checkoutData.paymentType === 'TARJETA' && 'Pago con tarjeta de débito/crédito' }
                                { checkoutData.paymentType === 'TRANSFERENCIA' && (
                                    <>
                                        Pago con transferencia/depósito bancario<br/>
                                        <Text fontSize={'sm'}>La información de pago le llegará a su casilla de mail.</Text>
                                    </>
                                    ) 
                                }
                                { checkoutData.paymentType === 'MERCADO_PAGO' && 'Pago con Mercado Pago' }
                            </Text>
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        </Box>
    )
};

export default CheckoutInfo;