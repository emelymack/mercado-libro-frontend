import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import facebookIcon from "../../../assets/icons/icon-facebook-white.svg";
import twitterIcon from "../../../assets/icons/icon-twitter-white.svg";
import instagramIcon from "../../../assets/icons/icon-instagram-white.svg";
import whatsappIcon from "../../../assets/icons/icon-whatsapp-white.svg";
import logo from "../../../assets/logo-white.svg";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { useAppSelector } from "../../../context/hooks";

const Links = [
  {
    name: "Facebook",
    url: "",
    img: facebookIcon,
  },
  {
    name: "Twitter",
    url: "",
    img: twitterIcon,
  },
  {
    name: "Instagram",
    url: "",
    img: instagramIcon,
  },
  {
    name: "Whatsapp",
    url: "",
    img: whatsappIcon,
  },
];

interface Props {
  onOpenLogin: () => void
}
const Footer = ({onOpenLogin}:Props) => {
  const isLogged = useAppSelector(state => state.auth.isLogged)

  return (
    <footer>
      <Container maxW={"container.xl"} py={10} px={{ base: 5, md: 5, lg: 12 }}>
        <SimpleGrid columns={{ sm: 2, md: 4 }} spacing="20px">
          <Flex flexDir={"column"} alignItems={{ base: "center", md: "start" }}>
            <Heading as="h5" size={"md"} mb={3}>
              SEGUINOS
            </Heading>
            <Box display={"flex"} gap={3}>
              {Links.map((link) => (
                <a href={link.url}>
                  <div className="icon-outline">
                    <Image src={link.img} alt={link.name} />
                  </div>
                </a>
              ))}
            </Box>
          </Flex>
          <Box
            display={"flex"}
            flexDir={"column"}
            alignItems={{ base: "center", md: "start" }}
          >
            <Link className="footerLink" href="tel:+5491111111" mb={1}>
              <PhoneIcon me={1} /> +54 9 111 1111
            </Link>
            <Link
              className="footerLink"
              href="mailto:mercadolibro@mail.com"
              textDecor={"underline"}
            >
              <EmailIcon me={2} />
              mercadolibro@mail.com
            </Link>
          </Box>
          <Box
            display={"flex"}
            flexDir={"column"}
            alignItems={{ base: "center", md: "start" }}
          >
            {!isLogged && (
              <>
                <Link className="footerLink" onClick={onOpenLogin} mb={1}>
                Iniciar sesión
                </Link>
                <Link className="footerLink" href={`/register`} mb={1}>
                  Registrarse
                </Link>
              </>
            )}
            <Link className="footerLink" href={`/questions`} mb={1}>
              Preguntas Frecuentes
            </Link>
            <Link className="footerLink" href={`/novedades`} mb={1}>
              Novedades
            </Link>
          </Box>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Image src={logo} w={{ base: "50%", md: "75%" }} />
          </Box>
        </SimpleGrid>
      </Container>
      <hr color="white" />
      <Text py={4} align={"center"} fontSize={"sm"}>
        Copyright © 2023 MercadoLibro. Todos los derechos reservados.
      </Text>
    </footer>
  );
};

export default Footer;
