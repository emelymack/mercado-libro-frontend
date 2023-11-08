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
  VStack,
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
    setValue,
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

  useEffect(() => {
    if (user && isOpen) {
      setValue("name", user.name);
      setValue("lastName", user.lastName);
      setValue("email", user.email);
    }
  }, [user, isOpen, setValue]);

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
    <Modal isOpen={!!isOpen} onClose={onClose} isCentered size="2xl">
      <ModalOverlay bg="blackAlpha.300" backdropBlur="2px" />
      <ModalContent
        m={4}
        p={{ base: 4, md: 6 }}
        bg={"brand.violetLogo50"}
        borderRadius="lg"
        shadow="xl"
      >
        <ModalHeader textAlign="center" fontSize="2xl" color={"brand.blueLogo"}>
          Editar Usuario
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <form onSubmit={handleFormSubmit(onSubmit)}>
              <FormControl id="name" isInvalid={!!errors.name} mt={6} mb={6}>
                <Input
                  variant="outline"
                  placeholder="Nombre"
                  {...register("name")}
                  size="md"
                />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl id="lastName" isInvalid={!!errors.lastName} mb={6}>
                <Input
                  variant="outline"
                  placeholder="Apellido"
                  {...register("lastName")}
                  size="md"
                />
                <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
              </FormControl>
              <FormControl id="email" isInvalid={!!errors.email} mb={6}>
                <Input
                  variant="outline"
                  placeholder="Email"
                  {...register("email")}
                  size="md"
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
              <Button
                mt={4}
                w="full"
                bg={"brand.blueLogo"}
                color="white"
                isLoading={isLoading}
                type="submit"
                size="lg"
                _hover={{ bg: "brand.greenLogo" }}
              >
                Guardar Cambios
              </Button>
              <Button
                mt={4}
                w="full"
                variant="outline"
                color={"brand.blueLogo"}
                onClick={onClose}
                size="lg"
              >
                Cancelar
              </Button>
            </form>
          </VStack>
        </ModalBody>
      </ModalContent>
      {isLoading && <CustomLoading />}
    </Modal>
  );
};

export default EditUserModal;
