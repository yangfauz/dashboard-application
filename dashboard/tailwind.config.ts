import type { Config } from "tailwindcss";

export const COLORS = {
  // Primary Colors
  primary: {
    DEFAULT: "#FF5032", // 500
    hover: "#FF7A63", // 400
    "50": "#FFF3F1",
    "100": "#FFE4DF",
    "200": "#FFCDC5",
    "300": "#FFAA9C",
    "400": "#FF7A63",
    "500": "#FF5032",
    "600": "#F04123",
    "700": "#C9280C",
    "800": "#A6240E",
    "900": "#892413",
    "950": "#4B0E04",
  },
  secondary: {
    DEFAULT: "#1B2C59", // 950
    hover: "#214187", // 900
    "50": "#EFF7FF",
    "100": "#DCEBFD",
    "200": "#C1DEFC",
    "300": "#96C9FA",
    "400": "#65ABFA",
    "500": "#418BF0",
    "600": "#2B6DE5",
    "700": "#2359D2",
    "800": "#2348AA",
    "900": "#214187",
    "950": "#1B2C59",
    "1000": "#212530",
  },
  link: {
    DEFAULT: "#FF5032",
    hover: "#FF7A63",
  },
  success: {
    DEFAULT: "#20C997",
    hover: "#0CAB7C",
  },
  warning: {
    DEFAULT: "#FA8B0C",
    hover: "#D47407",
  },
  error: {
    DEFAULT: "#f5222d",
    hover: "#E30D0F",
  },
  info: {
    DEFAULT: "#2C99FF",
    hover: "#0D79DF",
  },
  dark: {
    DEFAULT: "#272B41",
    hover: "#131623",
  },
  gray: {
    DEFAULT: "#5A5F7D",
    hover: "#363A51",
    light: "#9299B8",
    "extra-light": "#ADB4D2",
    solid: "#9299b8",
  },
  white: {
    DEFAULT: "#ffffff",
    hover: "#5A5F7D",
  },
  danger: {
    DEFAULT: "#FF4D4F",
    hover: "#E30D0F",
  },
  pink: "#F63178",
  dash: "#E3E6EF",
  black: {
    DEFAULT: "#262626",
    border: "#26262629",
  },
} as const;

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: COLORS,
      borderColor: {
        light: "#F1F2F6",
        normal: "#E3E6EF",
        deep: "#C6D0DC",
      },
      backgroundColor: {
        "gray-light": "#F8F9FB",
        "gray-normal": "#F4F5F7",
        "gray-deep": "#EFF0F3",
        "gray-middle": "#1B2C590A"
      },
      fontFamily: {
        sans: ["Figtree", "sans-serif"],
      },
      fontSize: {
        base: "14px",
      },
      borderRadius: {
        base: "4px",
      },
      boxShadow: {
        base: "0 2px 8px rgba(0, 0, 0, 0.15)",
        card: "0 5px 20px rgba(146,153,184,0.03)",
      },
      height: {
        "btn-lg": "48px",
        "btn-sm": "36px",
        "btn-xs": "29px",
        "input-base": "48px",
        "input-sm": "30px",
        "input-lg": "50px",
      },
      spacing: {
        "grid-gutter": "25px",
      },
      typography: {
        "result-title": {
          fontSize: "20px",
        },
        "result-subtitle": {
          fontSize: "12px",
        },
      },
      // Additional themed configurations from the original theme
      textColor: {
        heading: "rgba(0, 0, 0, 0.85)",
        disabled: "rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
} satisfies Config;
