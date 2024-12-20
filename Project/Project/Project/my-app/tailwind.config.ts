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
        MyRed:"#C91919",
        MyGreen:"#41A332",
        MyYellow:"#F6C95C",
        MyDYellow:"#E7AF00",
        MyBrown:"#983D00",
        MyGrey:"#E6EAEB"
      },
      height: {
        100: '35rem',
        101:'45rem',
        102:'60rem'
      },
      width: {
        100: '28rem',
        101: '195vh'
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
export default config;
