import type { Config } from "tailwindcss";
import Typography from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [Typography],
} satisfies Config;
