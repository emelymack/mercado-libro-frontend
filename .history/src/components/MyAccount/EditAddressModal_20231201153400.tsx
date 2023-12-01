import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Grid, GridItem } from "@chakra-ui/react"
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
import { getUserAddress, postUserAddress } from "../../services/UserService";
import { useEffect, useState } from "react";
import CustomLoading from "../CustomLoading/CustomLoading";
import { Address } from "../../types/user";

const schema = z.object({
  street: z.string(),
  number: z.number(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  district: z.string(),
  department: z.string(),
});

type EditAddressDataForm = z.infer<typeof schema>;

interface EditAddressModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onEdit: () => void
}

const EditAddressModal = ({
  isOpen,
  onClose,
  onEdit
}: EditAddressModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [address, setAddress] = useState<Address | null>(null);

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
    setValue,
  } = useForm<EditAddressDataForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: EditAddressDataForm) => {
    setIsLoading(true);
    try {
      const response = await postUserAddress(data);
      if (response.statusCode === 201) {
        console.log("Direccion actualizada con éxito");
        onEdit();
      } else {
        console.error("Error al actualizar la direccion:", response.errorMessage);
      }
    } catch (error) {
      console.error("Error al actualizar la direccion:", error);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (isOpen) {
        const fetchAddress = async () => {
            try {
                const response = await getUserAddress();

                if (response.statusCode === 200 && response.data) {
                  setAddress(response.data);
                } else {
                  console.error("Failed to fetch address:", response.errorMessage);
                }
            } catch (error) {
                console.error("Failed to fetch address:", error);
            } finally {
                setIsLoading(false);
            }
        }

      fetchAddress();
    }
  }, [isOpen]);

  useEffect(() => {
    if (address && isOpen) {
      setValue("city", address.city);
      setValue("street", address.street);
      setValue("number", address.number);
      setValue("zipCode", address.zipCode);
      setValue("department", address.department);
      setValue("district", address.district);
      setValue("state", address.state);
    }
  }, [address, isOpen, setValue]);

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
          Editar direccion
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
          <form onSubmit={handleFormSubmit(onSubmit)}>
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
        <GridItem colSpan={1}>
          <FormControl id="street" isInvalid={!!errors.street} mt={6} mb={6}>
            <Input
              fontSize={{ base: "lg", md: "xl" }}
              padding={4}
              type="text"
              h={"auto"}
              bg="white"
              borderColor="#d8dee4"
              borderRadius="6px"
              placeholder="Calle"
              {...register("street")}
              size="md"
            />
            <FormErrorMessage>{errors.street?.message}</FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl id="number" isInvalid={!!errors.number} mb={6}>
            <Input
              fontSize={{ base: "lg", md: "xl" }}
              padding={4}
              type="number"
              h={"auto"}
              bg="white"
              borderColor="#d8dee4"
              borderRadius="6px"
              variant="outline"
              placeholder="Numero"
              {...register("number", { valueAsNumber: true })}
              size="md"
            />
            <FormErrorMessage>{errors.number?.message}</FormErrorMessage>
          </FormControl>
        </GridItem>
        {/* Repite para otros campos según sea necesario */}
      </Grid>
      <Button
        fontSize={{ base: "xl", md: "2xl" }}
        mt={4}
        w="full"
        bg={"brand.blueLogo"}
        color="white"
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

export default EditAddressModal;
