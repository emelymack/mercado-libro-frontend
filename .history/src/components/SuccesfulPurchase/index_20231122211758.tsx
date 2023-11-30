import { Heading, Text, Box, SimpleGrid } from "@chakra-ui/react";
import { useAppSelector } from "../../context/hooks";
import CheckoutInfo from "./CheckoutInfo";

const styles = {
    row: {
        borderBottom: "2px solid #003844"
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
            <SimpleGrid justifyItems='center' mb={20} className={`page ${isScrolling ? 'scroll' : ''}`}>
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
                    color='brand.blueLogo'
                    fontSize={{ base: "12px", sm: '16px', lg: '20px', xl: '25px'}}
                    fontWeight='600'
                    mb={10}
                    mt={2}
                    textAlign='center'
                    >
                        Toda la información del pedido y el envío fue enviada
                        a la casilla del correo electrónico indicado.
                    </Text>
                </Box>
                <CheckoutInfo/>
            </SimpleGrid>
    )

}


export default SuccesfulPurchase;