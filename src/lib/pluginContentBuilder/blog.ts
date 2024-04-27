import { readdirSync, readFileSync } from "fs";
import { parse } from "marked";

type FrontMatter = {
  title: string;
  author: string;
  date: string;
  [key: string]: string;
};

type Blog = { content: string; frontMatter: Partial<FrontMatter> };
type Blogs = (Blog & { slug: string })[];

const parseFrontMatter = (markdownString: string): Blog => {
  const [_, rawFrontMatter, ...content] = markdownString.split("---");
  const rawAttributes = rawFrontMatter.trim().split("\n");
  const attributes: Partial<FrontMatter> = {};

  rawAttributes.forEach((raw) => {
    const [key, ...value] = raw.split(":");
    attributes[key] = value.join().replaceAll('"', "").trim();
  });

  return { frontMatter: attributes, content: content.join() };
};

const buildMarkdownBlogs = (blogsDir: string): Blogs => {
  const fileList = readdirSync(blogsDir);

  const blogs = fileList.map((filename) => {
    const file = readFileSync(`${blogsDir}/${filename}`).toString();
    return { slug: filename.replace(".md", ""), ...parseFrontMatter(file) };
  });

  blogs.forEach((blog) => {
    blog.content = parse(blog.content) as string;
  });

  return blogs;
};

export { buildMarkdownBlogs, type Blog, type Blogs };
