import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  FormControl,
  FormErrorMessage,
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
import { Navigate } from "react-router-dom";

const schema = z.object({
  name: z.string(),
  lastName: z.string(),
  email: z
    .string()
    .email({ message: "Dirección de correo electrónico no válida" }),
});

type EditUserDataForm = z.infer<typeof schema>;

interface AddAddressModalProps {
  isOpen?: boolean;
  userId?: number;
  onClose: () => void;
}

const AddAdressModal = ({
  userId,
  isOpen,
  onClose,
}: AddAddressModalProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isAdmin = localStorage.getItem("isLoggedAdmin") === "true";

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
    setValue,
  } = useForm<EditUserDataForm>({
    resolver: zodResolver(schema),
  });

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
      onClose();
    }
  };


  return (
    <Modal isOpen={!!isOpen} onClose={onClose} isCentered size="2xl">
      <ModalOverlay bg="blackAlpha.300" backdropBlur="2px" />
      <ModalContent m={4} p={{ base: 4, md: 6 }} borderRadius="lg" shadow="xl">
        <ModalHeader
          mt={8}
          bg={"brand.greenLogo"}
          textAlign="center"
          fontSize="2xl"
          color={"white"}
        >
          Agregar direccion
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <form onSubmit={handleFormSubmit(onSubmit)}>
              <FormControl id="name" isInvalid={!!errors.name} mt={6} mb={6}>
                <Input
                  fontSize={{ base: "lg", md: "xl" }}
                  padding={4}
                  type="text"
                  h={"auto"}
                  bg="white"
                  borderColor="#d8dee4"
                  borderRadius="6px"
                  placeholder="Calle"
                  {...register("name")}
                  size="md"
                />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl id="lastName" isInvalid={!!errors.lastName} mb={6}>
                <Input
                  fontSize={{ base: "lg", md: "xl" }}
                  padding={4}
                  type="text"
                  h={"auto"}
                  bg="white"
                  borderColor="#d8dee4"
                  borderRadius="6px"
                  variant="outline"
                  placeholder="Numero"
                  {...register("lastName")}
                  size="md"
                />
                <FormControl id="email" isInvalid={!!errors.email} mb={6}>
                <Input
                  fontSize={{ base: "lg", md: "xl" }}
                  padding={4}
                  type="email"
                  h={"auto"}
                  bg="white"
                  borderColor="#d8dee4"
                  borderRadius="6px"
                  placeholder="Departamento (opcional)"
                  {...register("email")}
                  size="md"
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
                <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
              </FormControl>
              <FormControl id="email" isInvalid={!!errors.email} mb={6}>
                <Input
                  fontSize={{ base: "lg", md: "xl" }}
                  padding={4}
                  type="email"
                  h={"auto"}
                  bg="white"
                  borderColor="#d8dee4"
                  borderRadius="6px"
                  placeholder="Ciudad"
                  {...register("email")}
                  size="md"
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl id="email" isInvalid={!!errors.email} mb={6}>
                <Input
                  fontSize={{ base: "lg", md: "xl" }}
                  padding={4}
                  type="email"
                  h={"auto"}
                  bg="white"
                  borderColor="#d8dee4"
                  borderRadius="6px"
                  placeholder="Provincia"
                  {...register("email")}
                  size="md"
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
              <Button
                fontSize={{ base: "xl", md: "2xl" }}
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
                fontSize={{ base: "xl", md: "2xl" }}
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

export default AddAdressModal;
