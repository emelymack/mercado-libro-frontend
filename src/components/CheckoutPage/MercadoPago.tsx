import { Box, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, useDisclosure } from "@chakra-ui/react"
import { Payment, initMercadoPago } from "@mercadopago/sdk-react";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import ModalError from "../Modal/ModalError";
import { useNavigate } from "react-router-dom";
import { clearCartData } from "../../context/slices/cartSlice";
import { useState } from "react"
import ModalSuccess from "../Modal/ModalSuccess";
import { IBrickError } from "@mercadopago/sdk-react/bricks/util/types/common";


interface Props {
  isOpenModalMP: boolean,
  onCloseModalMP: () => void,
  invoiceId: string | null
}

initMercadoPago('TEST-7d04eb5c-5bb8-4696-a59e-533dfede69b9');

const customizationMP = {
  paymentMethods: {
    creditCard: "all",
    debitCard: "all",
    mercadoPago: "all",
  },
};

const onErrorMP = async (error:IBrickError) => {
  // callback llamado para todos los casos de error de Brick
  console.log(error);
};


const MercadoPago = ({isOpenModalMP, onCloseModalMP, invoiceId}: Props) => {
  const cartData = useAppSelector((state) => state.cart)
  const { isOpen: isOpenError, onOpen: onOpenError, onClose: onCloseError } = useDisclosure()
  const { isOpen: isOpenSuccess, onOpen: onOpenSuccess, onClose: onCloseSuccess } = useDisclosure()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [ error, setError ] = useState("")
  const [ isLoading, setIsLoading ] = useState(true)

  const initializationMP = {
    amount: cartData.total,
    // preferenceId: "<PREFERENCE_ID>",
  };

  const onReadyMP = async () => {
    setIsLoading(false)
  }

  const onSubmitMP = async (
    { selectedPaymentMethod, formData }
  ) => {
    console.log(formData);
    // callback llamado al hacer clic en el botón enviar datos
    return new Promise<void>((resolve, reject) => {
      fetch(`http://localhost:8080/v1/api/invoice/${invoiceId}/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        
        if(response.status === 'approved') {
          onOpenSuccess()
          dispatch(clearCartData())

          setTimeout(() => {
            navigate('/successful')
          }, 1500)
        } else {
          setError(response.error)
          onOpenError()
        }
        // recibir el resultado del pago
        resolve();
        })
      .catch((error) => {
        console.log(error);
        
        // manejar la respuesta de error al intentar crear el pago
        reject();
      });
    });
  };
  

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpenModalMP} onClose={onCloseModalMP}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Realizar pago con MercadoPago</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            { isLoading && (
              <Box display={'flex'} justifyContent={'center'} my={10}>
                <Spinner size={'xl'} thickness='4px' color="brand.violetLogo" />
              </Box>
            )  }
            <Payment
              initialization={initializationMP}
              customization={customizationMP}
              onSubmit={onSubmitMP}
              onReady={onReadyMP}
              onError={onErrorMP}
            />
            {/* <StatusScreen
              initialization={initializationMP}
              onReady={onReadyMP}
              onError={onErrorMP}
            /> */}
          </ModalBody>
        </ModalContent>
      </Modal>

      <ModalError isOpen={isOpenError} onClose={onCloseError} title={`ERROR: "${error}". Intente nuevamente, por favor.`} />
      <ModalSuccess isOpen={isOpenSuccess} onClose={onCloseSuccess} title="¡Pago realizado exitosamente! Redirigiendo..." />
    </>
  )
}

export default MercadoPago