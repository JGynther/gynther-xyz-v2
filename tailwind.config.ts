import type { Config } from "tailwindcss";
import Typography from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            "blockquote p:first-of-type::before": null,
            "blockquote p:first-of-type::after": null,
          },
        },
      },
    },
  },
  plugins: [Typography],
} satisfies Config;
