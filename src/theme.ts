import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import "@fontsource/gabarito";

const colors = {
  brand: {
    blueLogo: "#003844",
    greenLogo: "#006C67",
    violetLogo: "#8884FF",
    violetLogo25: "rgba(136,132,255,.25)",
    violetLogo50: "#C4C3FF",
    violetLogo75: "rgba(136,132,255,.75)",
  },
};

const components = {
  Button: {
    variants: {
      brandPrimary: {
        background: 'brand.violetLogo75',
        color: 'brand.blueLogo',
        fontFamily: 'serif',
        fontWeight: '800',
        textTransform: 'uppercase',
        borderRadius: 14,
        borderWidth: '3px',
        borderColor: 'brand.violetLogo !important',
        boxShadow: '2px 3px 8px 4px rgba(0, 0, 0, 0.15)',
        transition: 'all .2s ease-in-out',
        height: 'auto',
        _hover: {
          backgroundColor: 'brand.violetLogo',
          fontSize: 'lg',
          // borderColor: 'brand.blueLogo !important'
        },
        _active: {
          fontSize: 'md'
        }
      }
    }
    

  },
  Card: {
    baseStyle: {
      container: {
        backgroundColor: '#fff',
        border: `3px solid ${colors.brand.greenLogo} !important`,
        borderRadius: 20,
        boxShadow: '6px 8px 15px 3px rgba(0, 0, 0, 0.16)',
        transition: 'background .2s ease-in-out',
        _hover: {
          backgroundColor: 'brand.violetLogo25'
        }
      },
      body: {
        paddingTop: '2px',
        color: '#212427'
      },
      footer: {
        paddingTop: '2px',
      },
    }
  },
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