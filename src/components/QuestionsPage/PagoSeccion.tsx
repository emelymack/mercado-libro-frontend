
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from "@chakra-ui/react";
import { Title } from "../Title";

export const PagoSeccion = () => {


    return (
<>
<Title htmlElement={"h2"} size="lg" text={"Métodos de Pago"}  />
<Accordion allowToggle mb={10}>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
        ¿Qué métodos de pago aceptan?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    Aceptamos tarjetas de crédito/débito 
    (Visa, MasterCard, American Express) y también transferencia.
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
        ¿Es seguro introducir mis detalles de tarjeta en su sitio?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    Sí, nuestro sitio utiliza protocolos de seguridad estándar (SSL) 
    para garantizar la seguridad de tu información. Los datos de la 
    tarjeta se cifran durante la transmisión y no se almacenan en 
    nuestros servidores.
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
        ¿Ofrecen opciones de pago a plazos?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    Actualmente, no ofrecemos opciones de pago a plazos. 
    Solo aceptamos pagos completos al momento de la compra. 
    Pero puedes pagar con tarjeta de crédito.
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
        ¿Recibiré una factura con mi pedido?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    Sí, recibirás el resumen de tu compra detallada 
    por correo electrónico después de realizar tu compra.
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
        ¿Puedo pagar con una tarjeta emitida en el extranjero?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    Sí, aceptamos tarjetas emitidas internacionalmente. 
    Asegúrate de que tu tarjeta esté habilitada para transacciones 
    internacionales.
    </AccordionPanel>
  </AccordionItem>

</Accordion>

</>
     );
    }
    
    export default PagoSeccion;
