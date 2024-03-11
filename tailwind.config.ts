import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      ty: "400px",
      sm: "576px",
      md: "769px",
      lg: "992px",
      xl: "1200px",
      xxl: "1400px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primaryColor: "#296CA6",
        secondaryColor: "#244673",
        tertiaryColor: "#1c365b",
        buttonTextColor: "#f3bfc7",
        headerHover: "#BF6597",
        modalHover: "#E2B0A5",
        buttonBackgroundHover: "#bc558e",
        buttonBackground: "#BF6597",
      },
    },
  },
  plugins: [],
};

export default config;
