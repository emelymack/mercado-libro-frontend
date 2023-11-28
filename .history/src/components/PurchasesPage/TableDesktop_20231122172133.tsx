import { Text, Table, Thead, Tr, Th, Tbody, Td, Image, TableContainer} from "@chakra-ui/react"

const TableDesktop = () => {

    return(
        <TableContainer>
            <Table>
                <Thead>
                    <Tr>
                        <Th fontWeight='semibold' color='black' fontSize={{base: 'sm', '2xl': 'lg'}} textTransform='capitalize'>Producto</Th>
                        <Th fontSize={{base: 'sm', '2xl': 'md'}} color='black' fontWeight='semibold' textTransform='capitalize' textAlign='center'>Precio</Th>
                        <Th fontSize={{base: 'sm', '2xl': 'md'}} color='black' fontWeight='semibold' textTransform='capitalize' textAlign='center'>Cantidad</Th>
                        <Th fontSize={{base: 'sm', '2xl': 'md'}} color='black' fontWeight='semibold' textTransform='capitalize' textAlign='center'>Total</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td display='flex'>
                            <Image boxSize={{ base: '50px', md: '50px', lg: '80px', xl: '100px', '2xl': '120px'}} src='https://www.antena3.com/newa3flash/modulos_blancos/uploader/uploads/Destroza%20este%20diario.jpg'/>
                            <Text ml='20px' fontSize={{base: 'sm', '2xl': 'md'}} whiteSpace="normal" wordBreak="break-word" fontWeight='semibold'>DESTROZA ESTE DIARIO, KERI SMITH</Text>
                            
                        </Td>
                        <Td fontSize={{base: 'sm', '2xl': 'md'}} verticalAlign='top' textAlign='center'>$24.900</Td>
                        <Td fontSize={{base: 'sm', '2xl': 'md'}} verticalAlign='top' textAlign='center'>1</Td>
                        <Td fontSize={{base: 'sm', '2xl': 'md'}} verticalAlign='top' textAlign='center'>$24.900</Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    )
};

export default TableDesktop;