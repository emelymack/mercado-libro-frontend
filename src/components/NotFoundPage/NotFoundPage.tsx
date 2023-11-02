import { Box, Image } from "@chakra-ui/react";
import images from "../../types/images";

const NotFoundPage = () => {
  const randomImage = images[Math.floor(Math.random() * images.length)];

  return (
    <Box
      h="100vh"
      w="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      <Image
        src={randomImage}
        alt="Not Found"
        objectFit="cover"
        // boxSize="150px"
      />
    </Box>
  );
};

export default NotFoundPage;
