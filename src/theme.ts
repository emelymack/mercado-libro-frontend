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

const fonts = {
  heading: `'Gabarito', sans-serif`,
  body: `'Gabarito', sans-serif`,
};
const config: ThemeConfig = {
  initialColorMode: "dark",
};

const theme = extendTheme({ config, colors, fonts });

export default theme;
