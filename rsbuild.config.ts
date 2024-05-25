import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import type { AcceptedPlugin } from "postcss";
import million from "million/compiler";

import { pluginContentBuilder } from "./src/lib/pluginContentBuilder";

export default defineConfig({
  html: {
    title: "Joona Gynther",
  },
  plugins: [pluginReact(), pluginContentBuilder()],
  tools: {
    rspack: (config, { appendPlugins, isProd }) => {
      isProd && appendPlugins(million.rspack({ auto: true, telemetry: false }));
      return config;
    },
    postcss: {
      postcssOptions: {
        plugins: ["tailwindcss" as unknown as AcceptedPlugin],
      },
    },
  },
});
