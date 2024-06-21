import { type Blogs } from "@lib/pluginContentBuilder/blog";
import { BannerSmall as Banner } from "@components/banner";

type BlogProps = {
  blogs: Blogs;
};

const readTime = (content: string) =>
  `${Math.ceil(content.split(" ").length / 225)} min read`;

const date = (unformated: string = "") =>
  new Date(unformated).toLocaleDateString("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const Ravings = ({ blogs }: BlogProps) => {
  return (
    <div className="mx-auto max-w-screen-md">
      <a href="/">
        <Banner />
      </a>
      <div className="flex flex-col space-y-10 mt-16">
        {blogs.map((blog) => {
          return (
            <a
              key={blog.slug}
              href={`ravings/${blog.slug}`}
              className="border-2 rounded p-6 tracking-wider text-lg opacity-80 hover:bg-neutral-800 transition-colors"
            >
              {blog.frontMatter.title}
              <p className="text-sm mt-2 opacity-80">{blog.snippet}</p>
              <p className="text-xs mt-6 opacity-60">
                {date(blog.frontMatter.date)} • {blog.frontMatter.author} •{" "}
                {readTime(blog.content)}
              </p>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Ravings;
