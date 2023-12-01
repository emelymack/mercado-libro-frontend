import { Grid, Text, Box } from "@chakra-ui/react"

const OrderDetail = () => {

    return(
        <Box pt={60} pb={40} display={"flex"} flexDir={"column"} alignItems={"center"} >
            <Grid templateRows='repeat(2, 1fr)' templateColumns='repeat(5, 1fr)' gap={4}>

            </Grid>
        </Box>
    )
}

export default OrderDetail;