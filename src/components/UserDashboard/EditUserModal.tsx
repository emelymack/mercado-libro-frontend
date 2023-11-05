import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  //   Center,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  //   VStack,
} from "@chakra-ui/react";
import { getUserById, patchUser } from "../../services/UserService";
import { useEffect, useState } from "react";
import { User } from "../../types/user";
import CustomLoading from "../CustomLoading/CustomLoading";

const schema = z.object({
  name: z.string(),
  lastName: z.string(),
  email: z
    .string()
    .email({ message: "Dirección de correo electrónico no válida" }),
});

type EditUserDataForm = z.infer<typeof schema>;

interface EditUserModalProps {
  isOpen?: boolean;
  userId?: number;
  onClose: () => void;
  reloadUsers: () => void;
}

const EditUserModal = ({
  userId,
  isOpen,
  onClose,
  reloadUsers,
}: EditUserModalProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm<EditUserDataForm>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    setIsLoading(true);
    if (userId && isOpen) {
      const fetchUser = async () => {
        try {
          const response = await getUserById(userId);
          if (response.statusCode === 200 && response.data) {
            setUser(response.data);
          } else {
            console.error("Failed to fetch user:", response.errorMessage);
          }
        } catch (error) {
          console.error("Failed to fetch user:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchUser();
    }
  }, [userId, isOpen]);

  const onSubmit = async (data: EditUserDataForm) => {
    setIsLoading(true);
    try {
      if (!userId) {
        console.error("User ID is undefined");
        return;
      }
      const response = await patchUser(userId, data);
      if (response.statusCode === 200) {
        console.log("Usuario actualizado con éxito");
      } else {
        console.error("Error al actualizar el usuario:", response.errorMessage);
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    } finally {
      setIsLoading(false);
      reloadUsers();
      onClose();
    }
  };

  return (
    <Modal isOpen={!!isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />
      <ModalContent bg={"brand.violetLogo50"}>
        <ModalHeader textAlign="center">Editar Usuario</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody>
          <form onSubmit={handleFormSubmit(onSubmit)} style={{ width: "100%" }}>
            <Flex direction="column" align="center">
              <Box w="90%" mb={4}>
                <Flex>
                  <FormControl
                    id="name"
                    w="50%"
                    mr={2}
                    isInvalid={!!errors.name}
                  >
                    <Input
                      variant="unstyled"
                      autoComplete="given-name"
                      padding={3}
                      fontSize={{ base: "lg", md: "xl" }}
                      h={"auto"}
                      placeholder="Nombre"
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
                    id="lastName"
                    w="50%"
                    isInvalid={!!errors.lastName}
                  >
                    <Input
                      variant="unstyled"
                      autoComplete="family-name"
                      padding={3}
                      fontSize={{ base: "lg", md: "xl" }}
                      h={"auto"}
                      placeholder="Apellido"
                      type="text"
                      {...register("lastName")}
                      bg="white"
                      borderColor="#d8dee4"
                      size="sm"
                      borderRadius="6px"
                    />
                    {errors.lastName && (
                      <FormErrorMessage fontSize="lg" color="red">
                        {errors.lastName.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </Flex>
              </Box>
              <FormControl id="email" w="100%" isInvalid={!!errors.email}>
                <Input
                  padding={3}
                  fontSize={{ base: "lg", md: "xl" }}
                  h={"auto"}
                  placeholder={"Dirección de correo electrónico"}
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
            </Flex>
            <HStack
              fontSize={{ base: "lg", md: "xl" }}
              spacing="1"
              w="100%"
              justifyContent="flex-start"
            >
              {/* Links or additional elements can be added here */}
            </HStack>
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
              Guardar Cambios
            </Button>
            <Button
              onClick={onClose}
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
              Cancelar
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
      {isLoading ? <CustomLoading /> : null}
    </Modal>
  );
};

export default EditUserModal;
