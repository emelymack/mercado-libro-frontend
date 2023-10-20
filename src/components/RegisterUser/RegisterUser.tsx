import {
  Button,
  Card,
  CardBody,
  Center,
  FormControl,
  HStack,
  Heading,
  Input,
  Link,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useForm, FieldValues } from "react-hook-form";

const RegisterUser = () => {
  const breakpointValue = useBreakpointValue({
    base: "base",
    md: "md",
    lg: "lg",
  });
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.info(data);
  };

  return (
    <Center>
      <Card
        bg="brand.violetLogo50"
        variant="outline"
        borderColor="#d8dee4"
        maxW={
          breakpointValue === "base"
            ? "90%"
            : breakpointValue === "lg"
            ? "800px"
            : "500px"
        }
        w="100%"
      >
        <CardBody padding={10}>
          <VStack spacing={6}>
            <Heading
              as="h1"
              fontWeight="800"
              fontSize={{ base: "2xl", md: "4xl" }}
              letterSpacing="-0.5px"
              color={"brand.greenLogo"}
            >
              Registro
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
              <FormControl id="name" w="100%">
                <Input
                  padding={3}
                  fontSize={{ base: "lg", md: "xl" }}
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
              <FormControl id="email" paddingTop="20px" w="100%">
                <Input
                  padding={3}
                  fontSize={{ base: "lg", md: "xl" }}
                  h={"auto"}
                  placeholder={
                    breakpointValue === "base"
                      ? "Correo electrónico"
                      : "Dirección de correo electrónico"
                  }
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
              <FormControl id="password" paddingTop="20px" w="100%">
                <Input
                  padding={3}
                  fontSize={{ base: "lg", md: "xl" }}
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
              <FormControl id="confirmPassword" paddingTop="20px" w="100%">
                <Input
                  padding={3}
                  fontSize={{ base: "lg", md: "xl" }}
                  h={"auto"}
                  placeholder="Confirma tu contraseña"
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
                  fontSize={{ base: "xl", md: "2xl" }}
                  w="40%"
                  type="submit"
                  bg="brand.violetLogo"
                  color="brand.blueLogo"
                  borderRadius="6px"
                  size="lg"
                  fontWeight="400"
                  _hover={{ bg: "brand.greenLogo", color: "white" }}
                >
                  Registrate
                </Button>
              </Center>
            </form>
            <Center paddingTop={20}>
              <HStack fontSize={{ base: "lg", md: "xl" }} spacing="1" w="100%">
                <Link isExternal color="#006C67" href="#">
                  ¿Ya tienes una cuenta? Inicia sesión.
                </Link>
              </HStack>
            </Center>
          </VStack>
        </CardBody>
      </Card>
    </Center>
  );
};

export default RegisterUser;
