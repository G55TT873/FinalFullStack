import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        MyYellow: "#F5C012",
        MyBlue: "#002C5D"
        
      },
      borderRadius: {
        "4xl" : "14rem"
      },
      height: {
        "45":"45.6rem",
        "100":"35rem",
        "101":"170rem",
        "102":"48rem",
        "same":"32rem"
      },
      width: {
        "100":"25rem",
        "51":"47.5rem",
        "same":"23rem"
      },
      fontSize: {
        "10xl":"7rem"
      },
      animation: {
        RightToLeft: "RightToLeft 20s infinite linear",
        "spin-slow": "spin 15s linear infinite",
      },
      keyframes: {
        RightToLeft: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      fontFamily: {
        sans: ["sans-serif"],
      },
      textStroke: {
        "1": "1px",
      },
      
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
export default config;
