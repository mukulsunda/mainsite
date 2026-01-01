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
        primary: "#FFD058", // Yellow
        secondary: "#000000", // Black
        light: "#FFFFFF", // White
        "neo-yellow": "#FFD058",
        "neo-white": "#FFFFFF",
        "neo-black": "#000000",
      },
      fontFamily: {
        sans: ['var(--font-main)', 'sans-serif'],
      },
      boxShadow: {
        'neo': '5px 5px 0px 0px #000000',
        'neo-hover': '7px 7px 0px 0px #000000',
        'neo-sm': '3px 3px 0px 0px #000000',
      },
      borderWidth: {
        '3': '3px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
