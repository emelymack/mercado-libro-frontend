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
  name: z.string().min(2, { message: "Debe tener 2 o más caracteres" }),
  email: z
    .string()
    .email({ message: "Dirección de correo electrónico no válida" }),
});

type EditUserDataForm = z.infer<typeof schema>;

interface EditUserModalProps {
  isOpen?: boolean;
  userId?: number;
  onClose: () => void;
}

const EditUserModal = ({ userId, isOpen, onClose }: EditUserModalProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (data: EditUserDataForm) => {
    console.log(data);
    onSubmit(data);
    onClose();
  };

  const {
    register,
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
    }
    onClose();
  };

  return (
    <Modal isOpen={!!isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />
      <ModalContent>
        <ModalHeader textAlign="center">Editar Usuario</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={() => console.log("Hola")} style={{ width: "100%" }}>
            <Flex direction="column" align="center">
              <Box w="90%">
                <FormControl id="name" w="100%" isInvalid={!!errors.name}>
                  <Input
                    value={user ? user.name + " " + user.lastName : ""}
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
                    value={user ? user.email : ""}
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
              </Box>
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
          </form>
        </ModalBody>
      </ModalContent>
      {isLoading ? <CustomLoading /> : null}
    </Modal>
  );
};

export default EditUserModal;
