import { defineConfig } from "@rsbuild/core";
import { pluginBabel } from "@rsbuild/plugin-babel";
import { pluginReact } from "@rsbuild/plugin-react";

import { pluginContentBuilder } from "./src/lib/pluginContentBuilder";
import createMarkedWithHighlighting from "./src/lib/pluginContentBuilder/marked";

export default defineConfig(async () => {
  const parser = await createMarkedWithHighlighting();
  return {
    html: {
      title: "Joona Gynther",
    },
    plugins: [
      pluginReact(),
      pluginBabel({
        include: /\.(?:jsx|tsx)$/,
        babelLoaderOptions(opts) {
          opts.plugins?.unshift("babel-plugin-react-compiler");
        },
      }),
      pluginContentBuilder(parser),
    ],
    tools: {
      rspack: {
        watchOptions: {
          ignored: /preface.json|api.json/,
        },
      },
      postcss: () => ({
        postcssOptions: { plugins: ["@tailwindcss/postcss" as any] },
      }),
    },
  };
});
