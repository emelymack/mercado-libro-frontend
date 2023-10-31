import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Divider,
  Button,
  Text,
  Image,
  Box,
  CardHeader,
} from "@chakra-ui/react";
import iconCart from '../../assets/icons/icon-add-cart.svg'
import { Product } from "../../types/product";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ id, img, title, author, price }: Product) => {
  const navigate = useNavigate()

  const verMasInfo = () => {
    navigate(`/product/${id}`)
  }

  return (
    <Card variant={"productCard"} w={"auto"}>
      <CardHeader py={2}>
        <Box display={"flex"} justifyContent={"center"}>
          <Image
            src={img}
            maxH={200}
            w={"auto"}
            alt={title}
            borderRadius="lg"
          />
        </Box>
      </CardHeader>
      <Divider bg={"brand.greenLogo"} style={{ height: 2, opacity: 0.75 }} />
      <CardBody px={5} pb={3}>
        <Stack mt="6" spacing="0">
          {/* Titulo del libro */}
          <Heading size="md">{title}</Heading>
          {/* Nombre del autor */}
          <Text noOfLines={2}>{author}</Text>
          {/* Precio */}
          <Text color="brand.blueLogo" fontSize="2xl" fontWeight={600}>
            ${price}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter px={5}>
        <Button 
          variant="brandSecondary" 
          w={"100%"}
          h={"auto"} 
          py={3} 
          me={2} 
          onClick={() => verMasInfo()}
        >
          Ver más
        </Button>
        <Button variant="brandPrimary" w={"100%"} py={2} h={"auto"} px={10} onClick={()=>alert('Agregado!')} aria-label="Agregar al carrito">
          Agregar <Image src={iconCart} ps={1} w={8} mb={1} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
