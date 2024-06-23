import { readdirSync, readFileSync } from "fs";
import type { Parser } from "@lib/pluginContentBuilder/marked";

type FrontMatter = {
  title: string;
  author: string;
  date: string;
  [key: string]: string;
};

type Blog = { content: string; frontMatter: Partial<FrontMatter> };
type Blogs = (Blog & { slug: string; snippet: string })[];

const parseFrontMatter = (markdownString: string): Blog => {
  const [_, rawFrontMatter, ...content] = markdownString.split("---");
  const rawAttributes = rawFrontMatter.trim().split("\n");
  const attributes: Partial<FrontMatter> = {};

  rawAttributes.forEach((raw) => {
    const [key, ...value] = raw.split(":");
    attributes[key] = value.join().replaceAll('"', "").trim();
  });

  return { frontMatter: attributes, content: content.join("---") };
};

const snippet = (content: string) => `${content.slice(0, 200).trim()}...`;

const buildMarkdownBlogs = (blogsDir: string, parser: Parser): Blogs => {
  const fileList = readdirSync(blogsDir);

  const blogs = fileList.map((filename) => {
    const file = readFileSync(`${blogsDir}/${filename}`).toString();
    const { frontMatter, content } = parseFrontMatter(file);
    return {
      slug: filename.replace(".md", ""),
      snippet: snippet(content),
      frontMatter,
      content,
    };
  });

  blogs.forEach((blog) => {
    blog.content = parser.parse(blog.content, {
      async: false,
      gfm: true,
    }) as string;
  });

  blogs.sort(
    (a, b) =>
      new Date(b.frontMatter.date || 0).getTime() -
      new Date(a.frontMatter.date || 0).getTime()
  );

  return blogs;
};

export { buildMarkdownBlogs, type Blog, type Blogs };
