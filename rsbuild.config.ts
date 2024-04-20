import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import million from "million/compiler";

export default defineConfig({
  plugins: [pluginReact()],
  tools: {
    rspack: (config, { appendPlugins, isProd }) => {
      isProd && appendPlugins(million.rspack({ auto: true, telemetry: false }));
      return config;
    },
  },
});
