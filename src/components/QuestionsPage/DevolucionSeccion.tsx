import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from "@chakra-ui/react";
import { Title } from "../Title";

export const DevolucionSeccion = () => {


    return (
<>
<Title htmlElement={"h2"} size="lg" text={"Devolución"}  />
<Accordion allowToggle mb={10}>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
        ¿Cuál es la política de devolución?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    Aceptamos devoluciones dentro de los 30 días 
    posteriores a la recepción del pedido. Los libros deben 
    estar en condiciones nuevas y sin usar. Contáctanos para 
    más información.
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
        ¿Cómo inicio el proceso de devolución?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    Te pedimos que te comuniques con nosotros por 
    nuestros medios de contacto para brindarte más detalles.
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
        ¿Cuánto tiempo tarda en procesarse un reembolso?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    Una vez que recibimos la devolución y verificamos 
    que los libros estén en condiciones adecuadas, procesaremos 
    el reembolso en un plazo de 5 a 7 días hábiles.
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
        ¿Cubren los gastos de envío de las devoluciones?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    os gastos de envío de las devoluciones corren a cargo del cliente, 
    a menos que la devolución sea el resultado de un error nuestro o 
    de un artículo defectuoso.
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
        ¿Qué debo hacer si recibo un libro dañado o incorrecto?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    Ponte en contacto con nuestro servicio de atención al 
    cliente de inmediato. Te proporcionaremos instrucciones 
    sobre cómo devolver el artículo dañado o incorrecto y te enviaremos 
    uno nuevo sin costo adicional.
    </AccordionPanel>
  </AccordionItem>

</Accordion>


</>
     );
    }
    
    export default DevolucionSeccion;
