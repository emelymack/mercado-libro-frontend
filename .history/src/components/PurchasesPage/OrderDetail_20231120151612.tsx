import { Grid, Text, Box, GridItem } from "@chakra-ui/react"

const OrderDetail = () => {

    return(
        <Box pt={60} pb={40} display={"flex"} flexDir={"column"} alignItems={"center"} >
            <Grid templateRows='repeat(2, 1fr)' templateColumns='repeat(6, 1fr)' gap={4}>
                <GridItem rowSpan={4} colSpan={2} bg='tomato'>
                </GridItem>
                <GridItem rowSpan={4} colSpan={2} bg='tomato'>
                </GridItem>
                <GridItem rowSpan={4} colSpan={2} bg='tomato'>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default OrderDetail;