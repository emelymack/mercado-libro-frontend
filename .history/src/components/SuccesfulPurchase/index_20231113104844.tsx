import { Heading } from "@chakra-ui/react";

const SuccesfulPurchase = () => {
    console.log('ok');

    return(
        <>
            <Heading
                size="lg"
                fontSize="50px"
                mb={10}
                mt={10}
                color="brand.greenLogo"
            >
                ¡Pedido realizado exitosamente!
            </Heading>
        </>
    )

}

export default SuccesfulPurchase;