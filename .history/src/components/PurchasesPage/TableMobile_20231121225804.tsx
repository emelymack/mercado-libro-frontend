import { Text, Table, Thead, Tr, Th, Tbody, Td, Image, TableContainer} from "@chakra-ui/react"

const TableMobile = () => {

    return(
        <TableContainer>
            <Table>
                <Thead>
                    <Tr>
                        <Th fontWeight='semibold' fontSize={{base: 'xl'}} color='black' textTransform='capitalize'>Producto</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td display='flex'>
                            <Image boxSize={{ base: '50px', md: '50px', lg: '80px', xl: '100px', '2xl': '120px'}} src='https://acdn.mitiendanube.com/stores/944/405/products/photo_2023-04-22_06-58-22-21-11e33180d060b8f66d16821838879699-320-0.webp'/>
                            <Text ml='20px' fontSize={{base: 'sm', '2xl': 'lg'}} whiteSpace="normal" wordBreak="break-word"><b>COLOR WOW - PRE ORDER | DREAM COAT SPRAY ANTI FRIZZ 200ml</b> x1</Text>
                        </Td>
                        <Td fontSize={{base: 'sm', '2xl': 'lg'}} verticalAlign='top' textAlign='center'>$24.900</Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    )
};

export default TableMobile;