import { Box, Heading, Image } from "@chakra-ui/react";
import images from "../../types/images";

const NotFoundPage = () => {
  const randomImage = images[Math.floor(Math.random() * images.length)];

  return (
    <Box
      display="flex"
      flexDir={'column'}
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      bg={'brand.blueLogo'}
      pt={{base: '140px',lg: '170px'}}
      px={10}
    >
      <Heading color={'white'} textAlign={'center'}>¡Ups! La página que estás buscando no existe...</Heading>
      <Image
        pt={5}
        src={randomImage}
        alt="Not Found"
        objectFit="cover"
        boxSize={{base: "300px",lg: "550px"}}
        mb={5}
      />
    </Box>
  );
};

export default NotFoundPage;
