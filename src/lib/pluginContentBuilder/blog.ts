import { readdirSync, readFileSync, writeFileSync } from "fs";
import type { Parser } from "@lib/pluginContentBuilder/marked";

type FrontMatter = {
  title: string;
  author: string;
  date: string;
  [key: string]: string;
};

type Blog = { content: string; frontMatter: FrontMatter };
type Preface = {
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

const buildJsonApi = (preface: Preface) => {
  const titles = [
    { what: "Senior Cloud Developer, Research", where: "F-Secure Corporation" },
  ];

  const links = [
    { service: "LinkedIn", url: "https://www.linkedin.com/in/joona-gynther/" },
    { service: "Threads", url: "https://www.threads.net/@gyntherjoona" },
    { service: "Github", url: "https://github.com/JGynther" },
  ];

  const jsonApi = {
    "who-am-i": { titles, links },
    blog: preface.map((blog) => ({
      ...blog.frontMatter,
      url: `https://gynther.xyz/ravings/${blog.slug}`,
    })),
  };

  return jsonApi;
};

const snippet = (content: string) => `${content.slice(0, 200).trim()}...`;

const buildMarkdownBlogs = (blogsDir: string, parser: Parser) => {
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

  const preface: Preface = blogs
    .sort(
      (a, b) =>
        new Date(b.frontMatter.date || 0).getTime() -
        new Date(a.frontMatter.date || 0).getTime(),
    )
    .map((blog) => ({
      frontMatter: blog.frontMatter,
      snippet: blog.snippet,
      slug: blog.slug,
    }));

  writeFileSync(`./public/blogs/preface.json`, JSON.stringify(preface));

  const jsonApi = buildJsonApi(preface);
  writeFileSync("./public/api.json", JSON.stringify(jsonApi));
};

export { buildMarkdownBlogs, type Blog, type Preface };
