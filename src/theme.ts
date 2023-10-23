import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import "@fontsource/gabarito";

const colors = {
  brand: {
    blueLogo: "#003844",
    greenLogo: "#006C67",
    violetLogo: "#8884FF",
    violetLogo50: "#C4C3FF",
  },
};

const components = {
  Input: {
    baseStyle: {
      field: {
        bg: "gray.700",
        color: "brand.blueLogo",
        _autofill: {
          border: "1px solid transparent",
          textFillColor: "#003844",
          boxShadow: "0 0 0px 1000px #ffffff inset",
          transition: "background-color 5000s ease-in-out 0s",
        },
        _placeholder: {
          color: "brand.blueLogo",
        },
      },
    },
  },
};

const fonts = {
  heading: `'Gabarito', sans-serif`,
  body: `'Gabarito', sans-serif`,
};
const config: ThemeConfig = {
  initialColorMode: "dark",
};

const theme = extendTheme({
  config,
  colors,
  fonts,
  components,
});

export default theme;
