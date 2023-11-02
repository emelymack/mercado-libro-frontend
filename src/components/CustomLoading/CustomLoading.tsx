import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Image,
} from "@chakra-ui/react";
import logo from "../../assets/logo.svg";

interface CustomLoadingProps {
  message?: string;
  spinnerSize?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

const CustomLoading = ({ message = "Cargando..." }: CustomLoadingProps) => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      backdropFilter="blur(10px)"
      zIndex={9999}
    >
      <Box>
        <CircularProgress
          color="brand.violetLogo"
          isIndeterminate
          size={"300px"}
        >
          <CircularProgressLabel>
            <Image padding={14} src={logo} alt="Mercado Libro" />
          </CircularProgressLabel>
        </CircularProgress>
        <Box
          fontWeight={"extrabold"}
          textAlign="center"
          mt={4}
          fontSize="2xl"
          color="brand.blueLogo"
        >
          {message}
        </Box>
      </Box>
    </Box>
  );
};

export default CustomLoading;
