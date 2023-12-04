import { Alert, AlertIcon, CloseButton, Text, Tooltip } from "@chakra-ui/react"

interface Props {
  text: string,
  isAlertVisible: boolean,
  onCloseAlert: () => void,
  onOpenAlert: () => void
}
const CopyToClipboard = ({text, isAlertVisible, onCloseAlert, onOpenAlert}: Props) => {

  const copy = () => {
    navigator.clipboard.writeText(text)
    onOpenAlert()
  }
  return (
    <>
      <Tooltip hasArrow label='Copiar al portapapeles' bg='teal.100' color='black'>
        <Text color={'brand.greenLogo'} display={'inline'} mx={1} onClick={copy} style={{cursor: 'pointer'}}>{text}</Text> 
      </Tooltip>

      { isAlertVisible && ( 
        <Alert status='success' position={'fixed'} w={'fit-content'} bottom={'30px'} left={'30px'} borderRadius={8}>
          <AlertIcon />
          ¡Texto copiado al portapapeles!
          <CloseButton
            alignSelf='flex-start'
            position='relative'
            right={-1}
            ms={5}
            color={'green'}
            onClick={onCloseAlert}
          />
        </Alert> 
      )}
    </>
  )
}

export default CopyToClipboard