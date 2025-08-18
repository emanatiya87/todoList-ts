// tailwind.config.js
import flowbite from "flowbite/plugin";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3b82f6", // same as blue-500
          light: "#60a5fa", // lighter shade
          dark: "#1d4ed8", // darker shade
        },
      },
    },
  },
  plugins: [flowbite],
};
