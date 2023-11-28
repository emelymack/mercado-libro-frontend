import { Text, Table, Thead, Tr, Th, Tbody, Td, Image, TableContainer} from "@chakra-ui/react"

const TableMobile = () => {

    return(
        <TableContainer>
            <Table>
                <Thead>
                    <Tr>
                        <Th fontWeight='semibold' fontSize={{base: 'sm', '2xl': 'lg'}} textTransform='capitalize'>Producto</Th>
                        <Th fontSize={{base: 'sm', '2xl': 'lg'}} fontWeight='semibold' textTransform='capitalize' textAlign='center'>Precio</Th>
                        <Th fontSize={{base: 'sm', '2xl': 'lg'}} fontWeight='semibold' textTransform='capitalize' textAlign='center'>Cantidad</Th>
                        <Th fontSize={{base: 'sm', '2xl': 'lg'}} fontWeight='semibold' textTransform='capitalize' textAlign='center'>Total</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td display='flex'>
                            <Image boxSize={{ base: '50px', md: '50px', lg: '80px', xl: '100px', '2xl': '120px'}} src='https://acdn.mitiendanube.com/stores/944/405/products/photo_2023-04-22_06-58-22-21-11e33180d060b8f66d16821838879699-320-0.webp'/>
                            <Text ml='20px' fontSize={{base: 'sm', '2xl': 'lg'}} whiteSpace="normal" wordBreak="break-word" fontWeight='semibold'>COLOR WOW - PRE ORDER | DREAM COAT SPRAY ANTI FRIZZ 200ml</Text>
                        </Td>
                        <Td fontSize={{base: 'sm', '2xl': 'lg'}} verticalAlign='top' textAlign='center'>$24.900</Td>
                        <Td fontSize={{base: 'sm', '2xl': 'lg'}} verticalAlign='top' textAlign='center'>1</Td>
                        <Td fontSize={{base: 'sm', '2xl': 'lg'}} verticalAlign='top' textAlign='center'>$24.900</Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    )
};

export default TableMobile;