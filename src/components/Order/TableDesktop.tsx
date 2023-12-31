import { Text, Table, Thead, Tr, Th, Tbody, Td, Image, TableContainer, useColorModeValue} from "@chakra-ui/react";
import { Item } from './index';
import { formatPrice } from "../Cart/PriceTag";

const TableDesktop = ({ items }: { items: Item[] }) => {

    return(
        <TableContainer>
            <Table>
                <Thead>
                    <Tr>
                        <Th fontWeight='semibold' color={useColorModeValue('black', 'white')} fontSize={{base: 'sm', '2xl': 'md'}} textTransform='capitalize'>Producto</Th>
                        <Th></Th>
                        <Th fontSize={{base: 'sm', '2xl': 'md'}} color={useColorModeValue('black', 'white')} fontWeight='semibold' textTransform='capitalize' textAlign='center'>Precio</Th>
                        <Th fontSize={{base: 'sm', '2xl': 'md'}} color={useColorModeValue('black', 'white')} fontWeight='semibold' textTransform='capitalize' textAlign='center'>Cantidad</Th>
                        <Th fontSize={{base: 'sm', '2xl': 'md'}} color={useColorModeValue('black', 'white')} fontWeight='semibold' textTransform='capitalize' textAlign='center'>Total</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {items.map((item) => (
                         <Tr>
                         <Td>
                             <Image objectFit='contain' boxSize={{ base: '50px', md: '50px', lg: '80px', xl: '100px', '2xl': '120px'}} src={item.book.image_links[0].url}/>
                         </Td>
                         <Td pl={0}>
                             <Text fontSize={{base: 'sm', '2xl': 'md'}} whiteSpace="normal" wordBreak="break-word" fontWeight='semibold'>{`${item.book.title}, ${item.book.authors.map(author => author.name).join(', ')}`}</Text>
                         </Td>
                         <Td fontSize={{base: 'sm', '2xl': 'md'}} textAlign='center'>{formatPrice(item.book.price)}</Td>
                         <Td fontSize={{base: 'sm', '2xl': 'md'}} textAlign='center'>{item.invoice.quantity}</Td>
                         <Td fontSize={{base: 'sm', '2xl': 'md'}} textAlign='center'>{formatPrice(item.book.price * item.invoice.quantity)}</Td>
                     </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
};

export default TableDesktop;