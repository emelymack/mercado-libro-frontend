import { Heading, Container } from "@chakra-ui/react";
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
            </Container>
        </>
    )

}

export default SuccesfulPurchase;