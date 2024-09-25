import { type Blogs } from "@lib/pluginContentBuilder";

declare global {
  // This gets replaced by Rsbuild based on the contentBuilder plugin
  const BLOGS: Blogs;
}
