import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from "@chakra-ui/react";
import { Title } from "../Title";

export const GeneralSeccion = () => {


    return (
<>
<Title htmlElement={"h2"} size="lg" text={"General"}  />
      <Accordion allowToggle mb={10} >
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
        ¿Cuál es el tiempo de entrega de los libros?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
     Nosotros despachamos el pedido en las próximas 24 hs después de la fecha de compra, 
luego dependiendo la dirección el correo se encargará de informarte la fecha de entrega.
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
        ¿Ofrecen envío internacional?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    No, por el momento no ofrecemos envíos internacionales
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
        ¿Cómo puedo realizar un seguimiento de mi pedido?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    Después de que tu pedido haya sido enviado, 
    podrás consultar el seguimiento de tu pedido a través de la web del correo
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
        ¿Puedo modificar mi pedido después de realizar la compra?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    Lamentablemente, una vez que se ha realizado la compra, no podemos modificar el pedido. 
    Te recomendamos revisar cuidadosamente tu carrito antes de confirmar la compra.
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
        ¿Cómo puedo ponerme en contacto con el servicio de atención al cliente?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    Puedes comunicarte con nuestro equipo de 
    atención al cliente a través de nuestros medios de contacto informados en la página web.
    </AccordionPanel>
  </AccordionItem>

</Accordion>
     </>
     );
    }
    
    export default GeneralSeccion;
