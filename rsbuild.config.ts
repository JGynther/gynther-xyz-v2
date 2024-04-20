import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import million from "million/compiler";
import UnoCSS from "@unocss/postcss";

export default defineConfig({
  html: {
    title: "Joona Gynther",
  },
  plugins: [pluginReact()],
  tools: {
    rspack: (config, { appendPlugins, isProd }) => {
      isProd && appendPlugins(million.rspack({ auto: true, telemetry: false }));
      return config;
    },
    postcss: {
      postcssOptions: {
        plugins: [UnoCSS()],
      },
    },
  },
});
