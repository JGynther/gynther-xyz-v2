import { type RsbuildPlugin } from "@rsbuild/core";
import { buildMarkdownBlogs, type Preface, type Blog } from "./blog";
import type { Parser } from "./marked";

const pluginContentBuilder = (
  parser: Parser,
  blogsDir = "blogs",
): RsbuildPlugin => ({
  name: "custom-content-builder",
  setup(api) {
    // Runs before each build.
    api.onBeforeEnvironmentCompile(() => {
      buildMarkdownBlogs(blogsDir, parser);
    });
  },
});

export { pluginContentBuilder };
export type { Preface, Blog };
