import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  VStack,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { SecondaryButton } from "../../Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link as LinkTo, useNavigate } from "react-router-dom";
import { loginUser } from "../../../services/LoginService";
import CustomLoading from "../../CustomLoading/CustomLoading";
import setLocalStorageItem from "../../../utils/setStorage";

const schema = z.object({
  email: z
    .string()
    .email({ message: "Dirección de correo electrónico no válida" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

type LoginDataForm = z.infer<typeof schema>;

interface LoginModalProps {
  setIsLogged: boolean;
}

const Login = ({ setIsLogged }: LoginModalProps) => {
  const loginOrNot = setIsLogged;

  console.log("Validando login--->", loginOrNot);
  const breakpointValue = useBreakpointValue({
    base: "base",
    sm: "sm",
    md: "md",
    lg: "lg",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDataForm>({
    resolver: zodResolver(schema),
  });

  const history = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSubmit = async (data: LoginDataForm) => {
    console.info(data);
    setIsLoading(true);
    onOpen();

    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      });

      if (response.statusCode === 200) {
        setIsLoading(false);
        console.log("Inicio de sesión exitoso");
        console.log("Datos del usuario:", response.data);
        const token = response.data?.token;
        if (token) {
          console.log("Token:", token);
          setLocalStorageItem("token", token);
        }
        // setIsLoggedIn(true);
        history("/userDashboard");
      } else {
        console.error("Error en el inicio de sesión:", response.errorMessage);
        setIsLoading(false);
        if (response.statusCode === 401) {
          setIsLoading(false);
          console.log("Credenciales inválidas.");
          //  TODO Mostrar un mensaje que las credenciales son inválidas
        }

        // TODO Actualizar el estado para mostrar un mensaje de error
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error en el inicio de sesión:", error);
      // TODO Actualizar el estado para mostrar un mensaje de error
    }
  };

  const handleClickPassword = () => {
    setShowPassword(!showPassword);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <SecondaryButton onClick={onOpen} text={"LOGIN"} />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={
          breakpointValue === "base"
            ? "90%"
            : breakpointValue === "lg"
            ? "800px"
            : "500px"
        }
      >
        <ModalOverlay />
        <ModalContent w={"600px"}>
          <ModalHeader
            paddingTop={10}
            textAlign={"center"}
            bg={"#FFFFFF"}
            color={"var(--secondary)"}
            fontWeight={800}
            fontSize={"2xl"}
          >
            ACCEDÉ A MERCADO LIBRO
          </ModalHeader>
          <ModalCloseButton color={"#000000"} />
          <ModalBody bg={"#FFFFFF"}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
              <Flex paddingTop={5}>
                <Button
                  h={14}
                  bg={"#D9D9D9"}
                  color={"#000000"}
                  leftIcon={<FaGoogle />}
                  flexGrow={1}
                >
                  Iniciar sesión con Google
                </Button>
                <Spacer />
                <Button
                  h={14}
                  bg={"#D9D9D9"}
                  color={"#000000"}
                  leftIcon={<FaFacebook />}
                  flexGrow={1}
                >
                  Iniciar sesión con Facebook
                </Button>
              </Flex>
              <Flex direction="column" align="center" paddingTop={4}>
                <Box w={"90%"}>
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
                      bg="#D9D9D9"
                      borderColor="#d8dee4"
                      size="sm"
                      borderRadius="6px"
                      _placeholder={{ color: "#000000" }}
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
                        bg="#D9D9D9"
                        color="#003844"
                        borderColor="#d8dee4"
                        size="sm"
                        borderRadius="6px"
                        autoComplete="new-password"
                        _placeholder={{ color: "#000000" }}
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
                              <ViewOffIcon w={8} h={8} color="#003844" />
                            ) : (
                              <ViewIcon w={8} h={8} color="#003844" />
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
                </Box>
              </Flex>
              <HStack
                fontSize={{ base: "lg", md: "xl" }}
                spacing="1"
                w="100%"
                justifyContent="flex-start"
              >
                <Link isExternal color="#006C67" href="#">
                  ¿Olvidaste tu contraseña?
                </Link>
              </HStack>
              <Center>
                <Button
                  marginTop={8}
                  fontSize={{ base: "md", md: "lg" }}
                  w="40%"
                  type="submit"
                  bg="#8884FF"
                  color="#003844"
                  borderRadius="6px"
                  size="lg"
                  fontWeight="700"
                  _hover={{ bg: "#003844", color: "white" }}
                >
                  INICIAR SESIÓN
                </Button>
              </Center>
            </form>

            <VStack>
              <Center paddingTop={10}>
                <HStack
                  fontSize={{ base: "lg", md: "xl" }}
                  spacing="1"
                  w="100%"
                >
                  <Link isExternal color="#006C67" href="#">
                    <LinkTo
                      to="/register"
                      onClick={() => {
                        history("/register");
                        onClose(); // Cierra el modal
                      }}
                    >
                      ¿Todavía no tienes una cuenta? Registrate.
                    </LinkTo>
                  </Link>
                </HStack>
              </Center>
            </VStack>
          </ModalBody>
        </ModalContent>
        {isLoading ? <CustomLoading /> : null}
      </Modal>
    </>
  );
};

export default Login;
