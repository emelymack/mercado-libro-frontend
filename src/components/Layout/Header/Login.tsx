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
  Image,
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
import { SecondaryButton } from "../../Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as LinkTo, useNavigate } from "react-router-dom";
import { loginUser } from "../../../services/LoginService";
import CustomLoading from "../../CustomLoading/CustomLoading";
import setLocalStorageItem from "../../../utils/setStorage";
import { useAppDispatch } from "../../../context/hooks";
import { loginAdmin, login } from "../../../context/slices/authSlice";
import CustomInput from "../../Input/CustomInput";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import googleLogo from "../../../assets/img/google-logo.png";
import facebookLogo from "../../../assets/img/facebook-logo.png";
import { setUser } from "../../../context/slices/userSlice";

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
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginDataForm>({
    resolver: zodResolver(schema),
  });

  const redirectToLoginProvider = async (provider: string) => {
  const redirectToLoginProvider = async (provider: string) => {
    setIsLoading(true);
    setLocalStorageItem("currentUrl", window.location.href);
    
    location.assign(`http://localhost:8080/v1/api/auth/oauth/${provider}`)
    
    location.assign(`http://localhost:8080/v1/api/auth/oauth/${provider}`)
  };

  const redirectToFacebook = () => {
    redirectToLoginProvider("facebook");
  };
  const redirectToGoogle = () => {
    redirectToLoginProvider("google");
  };

  const history = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = async (data: LoginDataForm) => {
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
        reset();

        if (token) {
          console.log("Token:", token);
          setLocalStorageItem("token", token);
        }

        const isAdmin = response.data?.user?.roles.some(
          (role) => role.description === "ADMIN"
        );

        if (isAdmin) {
          localStorage.setItem("isLogged", "true");
          localStorage.setItem("isLoggedAdmin", "true");
          dispatch(loginAdmin());
          history("/dashboard");
        } else {
          localStorage.setItem("isLogged", "true");
          localStorage.setItem("isLoggedAdmin", "false");
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
        <ModalContent w={{ base: "80vw", lg: "650px" }} px={5}>
          <ModalHeader
            paddingTop={12}
            textAlign={"center"}
            bg={"#FFFFFF"}
            color={"brand.greenLogo"}
            fontWeight={800}
            fontSize={"3xl"}
          >
            ACCEDÉ A MERCADO LIBRO
          </ModalHeader>
          <ModalCloseButton color={"brand.greenLogo"} fontSize={"lg"} />
          <ModalBody bg={"#FFFFFF"}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
              {/* Login con Google y Facebook */}
              {
                <Flex paddingTop={2} gap={3}>
                  <Button
                    h={14}
                    bg={"#D9D9D9"}
                    color={"brand.blueLogo"}
                    leftIcon={<FaGoogle />}
                    flexGrow={1}
                    onClick={redirectToGoogle}
                  >
                    Iniciar sesión con{" "}
                    <Image src={googleLogo} w={"60px"} ms={2} mt={1} />
                  </Button>
                  <Button
                    h={14}
                    bg={"#D9D9D9"}
                    color={"brand.blueLogo"}
                    leftIcon={<FaFacebook />}
                    flexGrow={1}
                    onClick={redirectToFacebook}
                  >
                    Iniciar sesión con{" "}
                    <Image src={facebookLogo} w={"70px"} ms={2} />
                  </Button>
                </Flex>
              }
              <Flex direction="column" align="center" paddingTop={4}>
                <Box w={"100%"}>
                  <FormControl id="email" w="100%" isInvalid={!!errors.email}>
                    <CustomInput
                      control={control}
                      name="email"
                      placeholder={
                        breakpointValue === "base"
                          ? "Correo electrónico"
                          : "Dirección de correo electrónico"
                      }
                      autoComplete="email"
                      type="email"
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
                      <CustomInput
                        control={control}
                        name="password"
                        placeholder="Contraseña"
                        type={showPassword ? "text" : "password"}
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
                mt={2}
                w="100%"
                justifyContent="flex-start"
              >
                <Link isExternal color="#006C67" href="#" fontSize={"smaller"}>
                  ¿Olvidaste tu contraseña?
                </Link>
              </HStack>
              <Center>
                <Button
                  type="submit"
                  variant={"brandPrimary"}
                  py={5}
                  px={10}
                  mt={7}
                  fontSize={"larger"}
                >
                  INICIAR SESIÓN
                </Button>
              </Center>
            </form>

            <VStack>
              <Center pt={10} pb={5}>
                <HStack fontSize="lg" spacing="1" w="100%">
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
