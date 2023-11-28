import { Grid, Text, Box, GridItem } from "@chakra-ui/react"

const OrderDetail = () => {

    return(
        <Box pt={60} pb={40} display={"flex"} flexDir={"column"} alignItems={"center"} >
            <Grid templateRows='repeat(2, 1fr)' templateColumns='repeat(5, 1fr)' gap={4}>
                <GridItem rowSpan={2} colSpan={1} bg='tomato'>
                </GridItem>
                <GridItem colSpan={2} bg='papayawhip'>
                </GridItem>
                <GridItem colSpan={2} bg='papayawhip'>
                </GridItem>
                <GridItem colSpan={4} bg='tomato'>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default OrderDetail;