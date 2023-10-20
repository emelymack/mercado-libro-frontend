import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  FormControl,
  HStack,
  Heading,
  Input,
  Link,
  Stack,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const RegisterUser = () => {
  const breakpointValue = useBreakpointValue({
    base: "base",
    md: "md",
    lg: "lg",
  });
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: unknown) => {
    console.info(data);
  };

  return (
    <Box>
      <Center>
        <Stack spacing="4">
          <Card
            bg="brand.violetLogo50"
            variant="outline"
            borderColor="#d8dee4"
            w="900px"
            h="800px"
          >
            <VStack as="header" spacing="6" mt="8">
              <Heading
                paddingTop={10}
                as="h1"
                fontWeight="800"
                fontSize="60px"
                letterSpacing="-0.5px"
                color={"brand.greenLogo"}
              >
                Registro
              </Heading>
            </VStack>
            <CardBody padding={20}>
              <form>
                <FormControl id="name">
                  <Input
                    padding={3}
                    fontSize="20px"
                    h={"auto"}
                    placeholder="Nombre Y Apellido"
                    type="name"
                    {...register("name")}
                    bg="white"
                    color="#003844"
                    borderColor="#d8dee4"
                    size="sm"
                    borderRadius="6px"
                    _placeholder={{
                      color: "brand.blueLogo",
                    }}
                  />
                </FormControl>
                <FormControl id="email" paddingTop="20px">
                  <Input
                    padding={3}
                    fontSize="20px"
                    h={"auto"}
                    placeholder="Dirección de correo electrónico"
                    type="email"
                    {...register("email")}
                    bg="white"
                    color="#003844"
                    borderColor="#d8dee4"
                    size="sm"
                    borderRadius="6px"
                    _placeholder={{
                      color: "brand.blueLogo",
                    }}
                  />
                </FormControl>
                <FormControl id="password" paddingTop="20px">
                  <Input
                    padding={3}
                    fontSize="20px"
                    h={"auto"}
                    placeholder="Contraseña"
                    type="password"
                    {...register("password")}
                    bg="white"
                    color="#003844"
                    borderColor="#d8dee4"
                    size="sm"
                    borderRadius="6px"
                    _placeholder={{
                      color: "brand.blueLogo",
                    }}
                  />
                </FormControl>
                <FormControl id="confirmPassword" paddingTop="20px">
                  <Input
                    padding={3}
                    fontSize="20px"
                    h={"auto"}
                    placeholder="Contraseña"
                    type="password"
                    color="brand.blueLogo"
                    {...register("confirmPassword")}
                    bg="white"
                    borderColor="#d8dee4"
                    size="sm"
                    borderRadius="6px"
                    _placeholder={{
                      color: "brand.blueLogo",
                    }}
                  />
                </FormControl>
                <Center>
                  <Button
                    marginTop={8}
                    fontSize={20}
                    w={200}
                    type="submit"
                    bg="brand.violetLogo"
                    color="brand.blueLogo"
                    borderRadius="6px"
                    size="lg"
                    fontWeight="400"
                    _hover={{ bg: "brand.greenLogo", color: "white" }}
                    onClick={handleSubmit(onSubmit)}
                  >
                    Registrate
                  </Button>
                </Center>
              </form>
              <Center paddingTop={20}>
                <HStack fontSize="lg" spacing="1">
                  <Link isExternal color="#006C67" href="#">
                    ¿Ya tienes una cuenta? Inicia sesión.
                  </Link>
                </HStack>
              </Center>
            </CardBody>
          </Card>
        </Stack>
      </Center>
    </Box>
  );
};
export default RegisterUser;
