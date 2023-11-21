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
  IconButton,
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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import moment from "moment";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import { createUser } from "../../services/RegisterService";
import { useNavigate } from "react-router-dom";
import CustomLoading from "../CustomLoading/CustomLoading";
import { Title } from "../Title";
import CustomInput from "../Input/CustomInput";

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
  // const history = useNavigate();

  const breakpointValue = useBreakpointValue({
    base: "base",
    md: "md",
    lg: "lg",
  });
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RegisterDataForm>({
    resolver: zodResolver(schema),
  });
  const history = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    setIsLoading(true);
    console.log("Click boton");
    console.info(data);
    const [name, lastName] = data.name.split(" ");
    createUser({
      email: data.email,
      name,
      lastName,
      password: data.password,
    })
      .then((createdUser) => {
        console.log("Usuario creado:", createdUser);
        setModalMessage("Usuario creado exitosamente");
        setIsSuccessModalOpen(true);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.statusCode === 401) {
          // Manejar el error de código 401 (no autorizado)
          console.error("No estás autorizado:", error);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          console.error("Error al crear usuario:", error);
          setModalMessage(error.message);
          setIsErrorModalOpen(true);
        }
      });
  };

  return (
    <Center pt={20}>
      <Card
        bg="brand.violetLogo25"
        variant="outline"
        borderColor="#d8dee4"
        borderRadius={20}
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
        py={5}
      >
        <CardBody py={10} px={{base:10, lg:20}}>
          <VStack spacing={6}>
            <Title text="Registro" htmlElement={"h1"} size="xl" color="green" />
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%", marginTop: 20 }}>
              <FormControl id="name" w="100%" isInvalid={!!errors.name}>
                <CustomInput 
                  control={control}
                  name="name"
                  placeholder="Nombre y Apellido"

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
                  <CustomInput 
                    control={control}
                    name="confirmPassword"
                    placeholder="Confirma tu contraseña"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="off"
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
              <Center mt={10}>
                <Button
                  variant={'brandPrimary'}
                  type="submit"
                  fontSize={'x-large'}
                  py={6}
                  px={10}
                  _hover={{fontSize: 'auto', backgroundColor: 'brand.violetLogo' }}
                >
                  Registrate
                </Button>
              </Center>
            </form>
            <Center paddingTop={10}>
              <HStack fontSize={{ base: "lg", md: "xl" }} spacing="1" w="100%">
                <Link isExternal color="#006C67" href="#">
                  ¿Ya tienes una cuenta? Inicia sesión.
                </Link>
              </HStack>
            </Center>
          </VStack>
        </CardBody>
      </Card>
      {isSuccessModalOpen && (
        <Modal
          isOpen={isSuccessModalOpen}
          onClose={() => {
            setIsSuccessModalOpen(false);
            reset();
          }}
        >
          <ModalOverlay />
          <ModalContent bg={"brand.greenLogo"} color={'white'}>
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
                  Usuario creado exitosamente
                </AlertTitle>
                <AlertDescription maxWidth="sm">
                  {modalMessage}
                </AlertDescription>
              </Alert>
            </ModalBody>
            <ModalFooter>
              <Button
                bg="brand.violetLogo"
                color="brand.blueLogo"
                _hover={{ bg: "brand.blueLogo", color: "white" }}
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  history("/");
                }}
              >
                Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      {isErrorModalOpen && (
        <Modal
          isOpen={isErrorModalOpen}
          onClose={() => setIsErrorModalOpen(false)}
        >
          <ModalOverlay />
          <ModalContent bg={"brand.greenLogo"}>
            <ModalHeader color={'white'} textAlign="center">Error al registrarse</ModalHeader>
            <ModalCloseButton color={'white'} />
            <ModalBody>
              <Alert
                bg={"brand.greenLogo"}
                color={'white'}
                status="error"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                height="200px"
              >
                <AlertIcon boxSize="40px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  El usuario no fue creado
                </AlertTitle>
                <AlertDescription maxWidth="sm">
                  {modalMessage}
                </AlertDescription>
              </Alert>
            </ModalBody>
            <ModalFooter>
              <Button
                bg="brand.violetLogo"
                color="brand.blueLogo"
                _hover={{ bg: "brand.blueLogo", color: "white" }}
                onClick={() => setIsErrorModalOpen(false)}
              >
                Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      {isLoading ? <CustomLoading /> : null}
    </Center>
  );
};

export default RegisterUser;
