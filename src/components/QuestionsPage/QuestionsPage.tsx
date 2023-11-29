import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Container, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAppSelector } from "../../context/hooks";
import { Title } from "../Title";
import GeneralSeccion from "./GeneralSeccion";
import PagoSeccion from "./PagoSeccion";
import DevolucionSeccion from "./DevolucionSeccion";


export const QuestionsPage = () => {
    const isScrolling = useAppSelector((state) => state.scroll.isScrolling);

    /* useEffect(() => { 
        window.scrollTo(0, 0);
    }); */
  


    return (
        <Container maxW={'container.xl'} className={`page ${isScrolling ? 'scroll' : ''}`}>
        <Heading
        size="3xl" fontWeight={900} mt={10} mb={12} color="brand.greenLogo" textTransform={'uppercase'} textAlign={"center"}>
        Preguntas Frecuentes
      </Heading>
       
      
      <GeneralSeccion />


      <PagoSeccion />


      <DevolucionSeccion />


        
      </Container>
    );
  }
  
  export default QuestionsPage;