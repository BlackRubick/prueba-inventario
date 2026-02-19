import { extendTheme } from "@chakra-ui/react";

const colors = {
  bg: {
    main: "#F4F6F9", // fondo general
    card: "#FFFFFF", // fondo cards
    sidebar: "#0B1120", // sidebar
  },
  primary: {
    main: "#2563EB", // azul profesional
    hover: "#1D4ED8", // azul profundo
  },
  success: "#16A34A",
  error: "#DC2626",
  warning: "#F59E0B",
  info: "#0EA5E9",
  text: {
    main: "#111827", // gris casi negro
    secondary: "#6B7280", // gris medio
  },
  border: "#E5E7EB", // bordes suaves
  sidebarText: "#CBD5E1", // texto sidebar
  sidebarActive: "rgba(37,99,235,0.15)",
  sidebarActiveBorder: "#2563EB",
  tableHeader: "#F9FAFB",
};

const fonts = {
  heading: `'Inter Variable', 'Poppins Variable', sans-serif`,
  body: `'Inter Variable', 'Poppins Variable', sans-serif`,
};

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  colors,
  fonts,
  config,
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  radii: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
    full: "9999px",
  },
  space: {
    px: "1px",
    1: "8px",
    2: "16px",
    3: "24px",
    4: "32px",
    5: "40px",
    6: "48px",
    7: "56px",
    8: "64px",
  },
  shadows: {
    card: "0 8px 20px rgba(0,0,0,0.05)",
    cardStrong: "0 20px 40px rgba(0,0,0,0.15)",
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "10px",
        fontWeight: 700,
      },
      variants: {
        solid: {
          bg: "primary.main",
          color: "white",
          _hover: {
            bg: "primary.hover",
            transform: "scale(1.02)",
            transition: "all 0.2s ease",
          },
        },
      },
    },
    Input: {
      baseStyle: {
        borderRadius: "8px",
        minH: "44px",
        fontWeight: 500,
      },
      variants: {
        outline: {
          field: {
            border: "1px solid",
            borderColor: "border",
            _focus: {
              borderColor: "primary.main",
              boxShadow: "0 0 0 2px #2563EB33",
            },
            _hover: {
              borderColor: "primary.main",
            },
          },
        },
      },
    },
    Card: {
      baseStyle: {
        borderRadius: "16px",
        bg: "bg.card",
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        p: 10,
      },
    },
  },
});

export default theme;
