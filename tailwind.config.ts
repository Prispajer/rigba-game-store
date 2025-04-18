import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    screens: {
      ty: "400px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1100px",
      xxl: "1400px",
      xxxl: "1800px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primaryColor: "#245f92",
        secondaryColor: "#1e3a60",
        tertiaryColor: "#122339",
        buttonTextColor: "#f3bfc7",
        inputBackgroundColor: "#1f527e",
        headerHover: "#BF6597",
        modalHover: "#E2B0A5",
        buttonBackgroundHover: "#bc558e",
        buttonBackground: "#BF6597",
        categoryGenresHover: "#213f69",
        filtersBackgroundColor: "#387CBD",
      },
      gridTemplateColumns: {
        "product-digital-products-details-auto-fit":
          "repeat(auto-fit, minmax(230px, 1fr))",
        "product-list-auto-fit": "repeat(auto-fit, minmax(200px, 1fr))",
        "account-orders-auto-fit": "repeat(auto-fit, minmax(50px, 1fr))",
      },
    },
  },
  plugins: [],
};

export default withUt(config);
