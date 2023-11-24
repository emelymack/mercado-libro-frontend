import { Heading, Container } from "@chakra-ui/react";

const SuccesfulPurchase = () => {
    console.log('ok');

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
            </Container>
        </>
    )

}

export default SuccesfulPurchase;