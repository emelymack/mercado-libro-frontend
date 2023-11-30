import { Image, Text, Table, Tr, Tbody, Td, Box, useDisclosure } from "@chakra-ui/react";
import EmailIcon from "../../assets/icons/icon-mail.svg";
import LocationIcon from "../../assets/icons/icon-location.svg";
import TruckIcon from "../../assets/icons/icon-shipping.svg";
import CreditCardIcon from "../../assets/icons/icon-credit-card.svg";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import { useEffect } from "react";
import { clearCheckoutData } from "../../context/slices/checkoutSlice";
import { useNavigate } from "react-router-dom";
import CopyToClipboard from "../CopyToClipboard";

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
	const { isOpen, onClose, onOpen } = useDisclosure()

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
								<Image src={EmailIcon} alt="Email icon" w={{ base: '30px', xl: '35px' }} />
							</Box>
							<Text>
								{checkoutData.email}
							</Text>
						</Td>
					</Tr>
					<Tr style={styles.row}>
						<Td style={styles.rowLineBreakContent}>
							<Box w={{ base: '35px', xl: '40px'}} h={{ base: '35px', xl: '40px'}} style={	styles.icon}>
								<Image src={LocationIcon} alt="Location icon" w={{ base: '25px', xl: '35px' }} />
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
								<Image src={TruckIcon} alt="Location icon" w={{ base: '25px', xl: '35px' }} />
							</Box>
							<Text>
								{ checkoutData.shippingType === 'ENVIO_DOMICILIO' ? (
									<>
										<Text fontWeight={500}>Envío a domicilio</Text>
										Llega el {checkoutData.shippingDate}
									</>
								) : (
									<>
										<Text fontWeight={500}>Retiro por sucursal</Text>
										<Text fontSize={'sm'}>Av. Fantasía 111, Buenos Aires</Text>
									</> 
								) }
							</Text>
						</Td>
					</Tr>
					<Tr>
						<Td style={styles.rowContent}>
							<Box w={{ base: '35px', lg: '50px'}} h={{ base: '35px', xl: '40px' }} style={styles.icon}>
								<Image src={CreditCardIcon} alt="Credit card icon" w={{ base: '25px', lg: 'auto' }} />
							</Box>
							<Text>
								{ checkoutData.paymentType === 'TARJETA' && 'Pago con tarjeta de débito/crédito' }
								{ checkoutData.paymentType === 'TRANSFERENCIA' && (
									<>
										<Text fontWeight={500}>Pago con transferencia/depósito bancario</Text>
										<Box mt={2}>
											<Text fontSize={'sm'}>CBU: 
												<CopyToClipboard text="1122334455667788991111" isAlertVisible={isOpen} onCloseAlert={onClose} onOpenAlert={onOpen} /> 
											</Text>
											<Text fontSize={'sm'}>Alias de CBU: 
												<CopyToClipboard text="mercadoLibro.mp" isAlertVisible={isOpen} onCloseAlert={onClose} onOpenAlert={onOpen} /> 
											</Text>
											<Text fontSize={'sm'}>Apellido y Nombre: Mercado Libro SRL</Text>
											<Text fontSize={'sm'} mt={2}>
												Una vez realizada la transferencia, por favor enviar el comprobante de la misma al mail 
												<CopyToClipboard text="compras@mercadolibro.com" isAlertVisible={isOpen} onCloseAlert={onClose} onOpenAlert={onOpen} /> 
												para terminar de confirmar su pedido.</Text>
										</Box>
									</>
									)
								}
								{ checkoutData.paymentType === 'MERCADO_PAGO' && 'Pago realizado con Mercado Pago' }
							</Text>
						</Td>
					</Tr>
				</Tbody>
			</Table>
		</Box>
	)
};

export default CheckoutInfo;