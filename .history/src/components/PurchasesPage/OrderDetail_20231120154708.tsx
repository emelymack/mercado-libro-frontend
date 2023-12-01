import { Grid, Text, Box, GridItem, Heading } from "@chakra-ui/react"

const OrderDetail = () => {

    return(
        <Box w='auto' pt={60} pb={40} display={"flex"} flexDir={"column"} alignItems={"center"} >
            <Heading alignSelf='flex-start'>Orden #3424</Heading>
            <Grid w='80vw' h='300px' templateRows='repeat(2, 1fr)' templateColumns='repeat(5, 1fr)' gap={4}>
                <GridItem rowSpan={2} colSpan={1} bg='tomato'>
                </GridItem>
                <GridItem colSpan={4} bg='tomato'>
                </GridItem>
                <GridItem colSpan={4} bg='tomato'>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default OrderDetail;