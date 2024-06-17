import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"]
      },
      colors: {
        primary: "#0E76A8",
        secondary: "#F7931E"
      },
      boxShadow: {
        "custom-purple": "0 8px 16px #7B68EE66"
      },
      backdropBlur: {
        '5.6': '5.6px',
      }
    }
  },
  plugins: []
};
export default config;
