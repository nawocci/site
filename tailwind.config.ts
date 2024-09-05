import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6347',
        secondary: '#6B7280',
        background: '#121212',
        text: '#F7FAFC',
        border: '#505050',
      },
    },
  },
  plugins: [],
};
export default config;
