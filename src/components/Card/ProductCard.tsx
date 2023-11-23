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
  useColorModeValue,
} from "@chakra-ui/react";
import { Book } from "../../types/product";
import { useNavigate } from "react-router-dom";
import AddToCart from "../Button/AddToCart";
import notFoundImg from '../../assets/img/404_3.jpg'
import { formatPrice } from "../Cart/PriceTag";

const ProductCard = ({
  id,
  image_links,
  title,
  authors,
  price,
  stock,
}: Book) => {
  // debugger;
  const navigate = useNavigate();
  // const urlImage = image_links[0]?.url;

  const verMasInfo = () => {
    navigate(`/product/${id}`);
  };

  return (
    <Card
      variant={"productCard"}
      w={"auto"}
      h={"100%"}
      _hover={{
        backgroundColor: useColorModeValue(
          "brand.violetLogo25",
          "brand.violetLogo50"
        ),
      }}
    >
      <CardHeader py={2}>
        <Box display={"flex"} justifyContent={"center"}>
          <Image
            src={image_links[0]?.url ?? notFoundImg}
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
          {authors?.map((elem) => (
            <Text noOfLines={2}>{elem.name}</Text>
          ))}
          {/* Precio */}
          <Text color="brand.blueLogo" fontSize="2xl" fontWeight={600}>
            {formatPrice(price)}
          </Text>
        </Stack>
      </CardBody>
      <CardFooter
        display={"flex"}
        flexDir={{ base: "column", lg: "row" }}
        px={5}
      >
        <Button
          variant="brandSecondary"
          w={"100%"}
          h={"auto"}
          py={3}
          me={2}
          mb={{ base: 3, lg: 0 }}
          onClick={() => verMasInfo()}
        >
          Ver más
        </Button>
        <AddToCart id={id} stock={stock} orderQty={1} />
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
