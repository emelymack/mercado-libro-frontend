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
      pt={'170px'}
      
      // backgroundImage={randomImage}
      // backgroundRepeat={"no-repeat"}
      // backgroundSize={'100%'}
    >
      <Heading color={'white'}>¡Ups! La página que estás buscando no existe...</Heading>
      <Image
        pt={5}
        src={randomImage}
        alt="Not Found"
        objectFit="cover"
        boxSize="550px"
        mb={5}
      />
    </Box>
  );
};

export default NotFoundPage;
