import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Card,
  CardBody,
  Center,
  FormControl,
  FormErrorMessage,
  HStack,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import moment from "moment";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";

const schema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Debe tener 5 o más caracteres" })
      .max(50),
    email: z
      .string()
      .email({ message: "Dirección de correo electrónico no válida" }),
    fecha: z.string().min(6),
    password: z
      .string()
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Se requiere confirmar la contraseña" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "La contraseña no coincide",
  });

type RegisterDataForm = z.infer<typeof schema>;

const RegisterUser = () => {
  const breakpointValue = useBreakpointValue({
    base: "base",
    md: "md",
    lg: "lg",
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterDataForm>({
    resolver: zodResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const currentDate = moment().format("YYYY-MM-DD");
    setValue("fecha", currentDate);
  }, [setValue]);

  const handleClickPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = (data: RegisterDataForm) => {
    console.info(data);
    setIsRegistered(true);
    onOpen();
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
        _hover={{
          transition: "none",
        }}
        marginY={20}
      >
        <CardBody padding={10}>
          <VStack spacing={6}>
            <Heading
              as="h1"
              fontWeight="800"
              fontSize={{ base: "2xl", md: "4xl" }}
              letterSpacing="-0.5px"
              color={"brand.blueLogo"}
            >
              Registro
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
              <FormControl id="name" w="100%" isInvalid={!!errors.name}>
                <Input
                  variant="unstyled"
                  autoComplete="name"
                  padding={3}
                  fontSize={{ base: "lg", md: "xl" }}
                  h={"auto"}
                  placeholder="Nombre Y Apellido"
                  type="name"
                  {...register("name")}
                  bg="white"
                  borderColor="#d8dee4"
                  size="sm"
                  borderRadius="6px"
                />
                {errors.name && (
                  <FormErrorMessage fontSize="lg" color="red">
                    {errors.name.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                id="email"
                paddingTop="20px"
                w="100%"
                isInvalid={!!errors.email}
              >
                <Input
                  padding={3}
                  fontSize={{ base: "lg", md: "xl" }}
                  h={"auto"}
                  placeholder={
                    breakpointValue === "base"
                      ? "Correo electrónico"
                      : "Dirección de correo electrónico"
                  }
                  autoComplete="email"
                  type="email"
                  {...register("email")}
                  bg="white"
                  borderColor="#d8dee4"
                  size="sm"
                  borderRadius="6px"
                />
                {errors.email && (
                  <FormErrorMessage fontSize="lg" color="red">
                    {errors.email.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                id="password"
                paddingTop="20px"
                w="100%"
                isInvalid={!!errors.password}
              >
                <InputGroup>
                  <Input
                    padding={3}
                    fontSize={{ base: "lg", md: "xl" }}
                    h={"auto"}
                    placeholder="Contraseña"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    bg="white"
                    color="#003844"
                    borderColor="#d8dee4"
                    size="sm"
                    borderRadius="6px"
                    autoComplete="new-password"
                  />

                  <InputRightElement padding={7}>
                    <IconButton
                      aria-label="Mostrar contraseña"
                      h="1.75rem"
                      size="sm"
                      onClick={handleClickPassword}
                      variant="ghost"
                      icon={
                        showPassword ? (
                          <ViewOffIcon w={8} h={8} color="brand.blueLogo" />
                        ) : (
                          <ViewIcon w={8} h={8} color="brand.blueLogo" />
                        )
                      }
                    />
                  </InputRightElement>
                </InputGroup>
                {errors.password && (
                  <FormErrorMessage fontSize="lg" color="red">
                    {errors.password.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                id="confirmPassword"
                paddingTop="20px"
                w="100%"
                isInvalid={!!errors.confirmPassword}
              >
                <InputGroup>
                  <Input
                    padding={3}
                    fontSize={{ base: "lg", md: "xl" }}
                    h={"auto"}
                    placeholder="Confirma tu contraseña"
                    type={showConfirmPassword ? "text" : "password"}
                    color="brand.blueLogo"
                    {...register("confirmPassword")}
                    bg="white"
                    borderColor="#d8dee4"
                    size="sm"
                    autoComplete="off"
                    borderRadius="6px"
                  />
                  <InputRightElement padding={7}>
                    <IconButton
                      aria-label="Mostrar contraseña"
                      h="1.75rem"
                      size="sm"
                      onClick={handleClickConfirmPassword}
                      variant="ghost"
                      icon={
                        showConfirmPassword ? (
                          <ViewOffIcon w={8} h={8} color="brand.blueLogo" />
                        ) : (
                          <ViewIcon w={8} h={8} color="brand.blueLogo" />
                        )
                      }
                    />
                  </InputRightElement>
                </InputGroup>
                {errors.confirmPassword && (
                  <FormErrorMessage fontSize="lg" color="red">
                    {errors.confirmPassword.message}
                  </FormErrorMessage>
                )}
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
      {isRegistered && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg={"brand.greenLogo"}>
            <ModalHeader textAlign="center">Registro Exitoso</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Alert
                bg={"brand.greenLogo"}
                status="success"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                height="200px"
              >
                <AlertIcon boxSize="40px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  Application submitted!
                </AlertTitle>
                <AlertDescription maxWidth="sm">
                  Thanks for submitting your application. Our team will get back
                  to you soon.
                </AlertDescription>
              </Alert>
            </ModalBody>
            <ModalFooter>
              <Button
                bg="brand.violetLogo"
                color="brand.blueLogo"
                _hover={{ bg: "brand.blueLogo", color: "white" }}
                onClick={onClose}
              >
                Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Center>
  );
};

export default RegisterUser;
