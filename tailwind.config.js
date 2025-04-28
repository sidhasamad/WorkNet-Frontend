import { keyframes } from "framer-motion";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {  
    extend: {
      colors:{
        primary: "#C5D3E8", 
        secondary: "#183B4E", //3E5879
        accent: "#3E5879",
        danger: "#B9CEEB",
        fifth:"#D5E5D5" ,
        sixth:'#B4D4FF',
        seven:'#87A8D0',
        chart:'#213448',
        chart1:'#547792'
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif","Italiana"], // Custom Font
      },
      animation:{
        jump:"jump 1s ease-out",
        'pulse-text': 'pulse 1.5s infinite ease-in-out',
      },
      keyframes:{
        jump:{
          "0%": { transform: "translateY(-50px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        }
      }
    },
  },
  plugins: [],
};
