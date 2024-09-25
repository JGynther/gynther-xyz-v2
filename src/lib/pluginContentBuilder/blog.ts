import { readdirSync, readFileSync, writeFileSync } from "fs";
import type { Parser } from "@lib/pluginContentBuilder/marked";

type FrontMatter = {
  title: string;
  author: string;
  date: string;
  [key: string]: string;
};

type Blog = { content: string; frontMatter: FrontMatter };
type Blogs = {
  frontMatter: FrontMatter;
  slug: string;
  snippet: string;
}[];

const parseFrontMatter = (markdownString: string): Blog => {
  const [_, rawFrontMatter, ...content] = markdownString.split("---");
  const rawAttributes = rawFrontMatter.trim().split("\n");
  const attributes: Partial<FrontMatter> = {};

  rawAttributes.forEach((raw) => {
    const [key, ...value] = raw.split(":");
    attributes[key] = value.join().replaceAll('"', "").trim();
  });

  return {
    frontMatter: attributes as FrontMatter,
    content: content.join("---"),
  };
};

const snippet = (content: string) => `${content.slice(0, 200).trim()}...`;

const buildMarkdownBlogs = (blogsDir: string, parser: Parser): Blogs => {
  const fileList = readdirSync(blogsDir);

  const blogs = fileList.map((filename) => {
    const file = readFileSync(`${blogsDir}/${filename}`).toString();
    const { frontMatter, content } = parseFrontMatter(file);
    const slug = filename.replace(".md", "");
    const parsedContent = parser.parse(content, { gfm: true }) as string;

    const blog = {
      slug,
      frontMatter,
      content: parsedContent,
      snippet: snippet(content),
    };

    writeFileSync(`./public/blogs/${blog.slug}.json`, JSON.stringify(blog));

    return blog;
  });

  return blogs
    .sort(
      (a, b) =>
        new Date(b.frontMatter.date || 0).getTime() -
        new Date(a.frontMatter.date || 0).getTime()
    )
    .map((blog) => ({
      frontMatter: blog.frontMatter,
      snippet: blog.snippet,
      slug: blog.slug,
    }));
};

export { buildMarkdownBlogs, type Blog, type Blogs };
