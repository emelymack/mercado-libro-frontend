import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
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
  ModalFooter,
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
import { useAppDispatch } from "../../../context/hooks";
import { setUser } from "../../../context/slices/userSlice";
import { login } from "../../../context/slices/authSlice";

const schema = z.object({
  email: z
    .string()
    .email({ message: "Dirección de correo electrónico no válida" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

type LoginDataForm = z.infer<typeof schema>;

const Login = () => {
  const dispatch = useAppDispatch();
  const breakpointValue = useBreakpointValue({
    base: "base",
    sm: "sm",
    md: "md",
    lg: "lg",
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginDataForm>({
    resolver: zodResolver(schema),
  });

  const history = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = async (data: LoginDataForm) => {
    console.log(data);
    setIsLoading(true);
    onOpen();

    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      });

      if (response.statusCode === 200) {
        console.log("Inicio de sesión exitoso");
        console.log("Datos del usuario:", response.data);
        const token = response.data?.token;
        const user = response.data?.user;
        reset();

        if (token) {
          console.log("Token:", token);
          setLocalStorageItem("token", token);
        }
        if (user) {
          localStorage.setItem(
            "user",
            JSON.stringify({ name: user.name, lastName: user.lastName })
          );
          dispatch(setUser({ name: user.name, lastName: user.lastName }));
        }
        const isAdmin = response.data?.user?.roles.some(
          (role) => role.description === "ADMIN"
        );

        if (isAdmin) {
          localStorage.setItem("isLogged", "true");
          dispatch(login());
          history("/userDashboard");
        } else {
          localStorage.setItem("isLogged", "true");
          dispatch(login());
          console.log("No eres administrador. Redireccionando...");
          history("/");
        }
      }
    } catch (error) {
      const err = error as { statusCode: number };
      if (err.statusCode === 401) {
        setErrorMessage(
          "Credenciales inválidas. Por favor, intente nuevamente."
        );
        setIsErrorModalOpen(true);
      } else {
        setErrorMessage("Error desconocido. Por favor, intente más tarde.");
        setIsErrorModalOpen(true);
      }
      console.error("Error en el inicio de sesión:", error);
    } finally {
      setIsLoading(false);
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
      {/* Modal para mostrar errores */}
      {isErrorModalOpen && (
        <Modal
          isOpen={isErrorModalOpen}
          onClose={() => setIsErrorModalOpen(false)}
          isCentered
          motionPreset="scale"
        >
          <ModalOverlay />
          <ModalContent
            mx={4}
            maxW={{ base: "90%", sm: "80%", md: "70%", lg: "40%" }}
            w="auto"
          >
            <ModalHeader
              bg={"brand.redLogo"}
              textAlign="center"
              fontSize="2xl"
              color={"white"}
            >
              Error de Inicio de Sesión
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Alert
                bg={"white"}
                status="error"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                height="200px"
              >
                <AlertIcon boxSize="60px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="2xl">
                  Error:
                </AlertTitle>
                <AlertDescription maxWidth="sm">
                  {errorMessage}
                </AlertDescription>
              </Alert>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="red"
                mr={3}
                onClick={() => setIsErrorModalOpen(false)}
              >
                Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default Login;
