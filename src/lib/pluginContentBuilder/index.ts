import { type RsbuildPlugin } from "@rsbuild/core";
import { buildMarkdownBlogs, type Blogs, type Blog } from "./blog";
import type { Parser } from "./marked";

const pluginContentBuilder = (
  parser: Parser,
  blogsDir = "blogs"
): RsbuildPlugin => ({
  name: "custom-content-builder",
  setup(api) {
    api.modifyRsbuildConfig((config) => {
      config.source ||= {};
      config.source.define ||= {};
      config.source.define.BLOGS = buildMarkdownBlogs(blogsDir, parser);
    });
  },
});

export { pluginContentBuilder };
export type { Blogs, Blog };
