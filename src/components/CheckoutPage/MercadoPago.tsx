import { Box, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, useDisclosure } from "@chakra-ui/react"
import { Payment, StatusScreen, initMercadoPago } from "@mercadopago/sdk-react";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import { useNavigate } from "react-router-dom";
import { clearCartData } from "../../context/slices/cartSlice";
import { useState } from "react"
import { IBrickError } from "@mercadopago/sdk-react/bricks/util/types/common";
import { BASE_URL, CREATE_INVOICE_URL } from "../../services/apiUrls";

interface Props {
  isOpenModalMP: boolean,
  onCloseModalMP: () => void,
  invoiceId: string | null,
  preferenceId: string | null
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


const MercadoPago = ({isOpenModalMP, onCloseModalMP, invoiceId, preferenceId}: Props) => {
  const cartData = useAppSelector((state) => state.cart)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [ , setError ] = useState("")
  const [ isLoading, setIsLoading ] = useState(true)
  const [ isResponseReady, setIsResponseReady ] = useState(false)
  const [ paymentId, setPaymentId ] = useState("")

  const initializationMP = {
    amount: cartData.total,
    preferenceId: preferenceId,
  };

  const initializationStatusMP = {
    paymentId: paymentId
  };

  const onReadyMP = async () => {
    setIsLoading(false)
  }

  const onSubmitMP = async (
    { formData }
  ) => {
    console.log(formData);
    // callback llamado al hacer clic en el botón enviar datos
    return new Promise<void>((resolve, reject) => {
      fetch(`${BASE_URL}${CREATE_INVOICE_URL}/${invoiceId}/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        setIsResponseReady(true)
        setPaymentId(response.id)
        if(response.status === 'approved') {
          dispatch(clearCartData())

          setTimeout(() => {
            navigate('/successful')
          }, 4000)
        } else {
          setError(response.error)
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
            { !isResponseReady && (
              <Payment
                initialization={initializationMP}
                customization={customizationMP}
                onSubmit={onSubmitMP}
                onReady={onReadyMP}
                onError={onErrorMP}
              />)
            }
            { isResponseReady && (
              <StatusScreen
                initialization={initializationStatusMP}
                onReady={onReadyMP}
                onError={onErrorMP}
              />)
            }
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default MercadoPago