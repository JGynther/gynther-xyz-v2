import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import type { AcceptedPlugin } from "postcss";

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
      rspack: {
        watchOptions: {
          ignored: /preface.json/,
        },
      },
      postcss: {
        postcssOptions: {
          plugins: ["tailwindcss" as unknown as AcceptedPlugin],
        },
      },
    },
  };
});
