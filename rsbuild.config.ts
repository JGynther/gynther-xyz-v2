import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import type { AcceptedPlugin } from "postcss";
import million from "million/compiler";

import { pluginContentBuilder } from "./src/lib/pluginContentBuilder";
import createMarkedWithHighlighting from "./src/lib/pluginContentBuilder/marked";

export default defineConfig(async () => {
  const parser = await createMarkedWithHighlighting();
  return {
    html: {
      title: "Joona Gynther",
    },
    plugins: [pluginReact(), pluginContentBuilder(parser)],
    tools: {
      rspack: (config, { appendPlugins, isProd }) => {
        isProd &&
          appendPlugins(million.rspack({ auto: true, telemetry: false }));
        return config;
      },
      postcss: {
        postcssOptions: {
          plugins: ["tailwindcss" as unknown as AcceptedPlugin],
        },
      },
    },
  };
});
